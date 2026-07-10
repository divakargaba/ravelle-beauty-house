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

    // Format a readable date for notifications
    const readableDate = new Date(date).toLocaleDateString('en-CA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // Google Calendar (optional)
    let credentials = {};
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');
    } catch {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY, skipping calendar');
    }

    if (credentials.client_email && calendarId) {
      try {
        const startDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

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

        await calendar.events.insert({
          calendarId,
          resource: {
            summary: `Ravélle — ${service} — ${name}`,
            description: eventDescription,
            location: address,
            start: { dateTime: startDateTime.toISOString(), timeZone: 'America/Edmonton' },
            end: { dateTime: endDateTime.toISOString(), timeZone: 'America/Edmonton' },
            colorId: '6',
          },
        });
      } catch (calErr) {
        console.error('Google Calendar error (non-fatal):', calErr);
      }
    } else {
      console.log('Google Calendar not configured, skipping calendar event');
    }

    // Send push notification via ntfy.sh
    await sendPushNotification({ name, phone, email, service, category, date: readableDate, time, address, notes });

    return res.status(200).json({ success: true, message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Failed to create appointment' });
  }
}

async function sendPushNotification({ name, phone, email, service, category, date, time, address, notes }) {
  const topic = 'ravelle-book-7783444456';
  const title = `New Booking — ${service}`;
  const body = [
    `Client: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Service: ${service} (${category})`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Address: ${address}`,
    notes ? `Notes: ${notes}` : null,
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      headers: {
        'Title': title,
        'Priority': '4',
        'Tags': 'sparkles,calendar',
      },
      body,
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('ntfy.sh notification error:', err);
    }
  } catch (err) {
    console.error('Push notification failed:', err);
  }
}

function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}
