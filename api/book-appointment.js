import { google } from 'googleapis';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, service, date, time, name, email, phone, address, notes } = req.body;

    if (!category || !service || !date || !time || !name || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Parse date and time into start/end DateTime
    const startDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    // Google Calendar API setup with service account
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!credentials.client_email || !calendarId) {
      console.error('Missing Google Calendar credentials or calendar ID');
      return res.status(500).json({ error: 'Calendar service not configured' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const eventDescription = [
      `Client: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Service: ${service} (${category})`,
      `Address: ${address}`,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    const calendarEvent = {
      summary: `Ravélle — ${service} — ${name}`,
      description: eventDescription,
      location: address,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Edmonton',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Edmonton',
      },
      colorId: '6',
    };

    await calendar.events.insert({
      calendarId,
      resource: calendarEvent,
    });

    // Format a readable date for notifications
    const readableDate = new Date(date).toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // Send email notification
    await sendEmailNotification({ name, phone, email, service, category, date: readableDate, time, address, notes });

    // Send SMS notification via email-to-SMS gateway
    await sendSmsNotification({ name, service, date: readableDate, time, phone });

    return res.status(200).json({ success: true, message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Failed to create appointment' });
  }
}

async function sendEmailNotification({ name, phone, email, service, category, date, time, address, notes }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Ravélle Beauty House <onboarding@resend.dev>';
  const toAddress = 'ravellebeautyhouse@gmail.com';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        subject: `New Booking Request — ${service} — ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #f5f5f5; padding: 32px; border-radius: 12px;">
            <h1 style="color: #C9A96E; font-size: 24px; margin-bottom: 8px;">New Booking Request</h1>
            <p style="color: #999; font-size: 14px; margin-bottom: 24px;">A new appointment has been submitted through the website.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E; width: 130px;">Client</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #222;"><a href="tel:${phone}" style="color: #f5f5f5;">${phone}</a></td></tr>
              ${email ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${email}</td></tr>` : ''}
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${service} (${category})</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Date</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${date}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Time</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${time}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Address</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${address}</td></tr>
              ${notes ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #222; color: #C9A96E;">Notes</td><td style="padding: 10px 0; border-bottom: 1px solid #222;">${notes}</td></tr>` : ''}
            </table>
            <p style="color: #666; font-size: 12px; margin-top: 24px;">This booking has also been added to your Google Calendar.</p>
          </div>
        `,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Resend email error:', err);
    }
  } catch (err) {
    console.error('Email notification failed:', err);
  }
}

async function sendSmsNotification({ name, service, date, time, phone }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('RESEND_API_KEY not set, skipping SMS notification');
    return;
  }

  const smsGateway = '7783444456@txt.bell.ca';
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Ravélle Beauty House <onboarding@resend.dev>';
  const message = `New Booking! ${name} booked ${service} on ${date} at ${time}. Client phone: ${phone}`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [smsGateway],
        subject: 'New Booking',
        text: message,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('SMS gateway error:', err);
    }
  } catch (err) {
    console.error('SMS notification failed:', err);
  }
}

function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}
