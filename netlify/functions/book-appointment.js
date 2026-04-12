const { google } = require('googleapis');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { category, service, date, time, name, email, phone, address, notes } = JSON.parse(event.body);

    if (!category || !service || !date || !time || !name || !phone || !address) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Parse date and time into start/end DateTime
    const startDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Default 2 hour slot

    // Google Calendar API setup with service account
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!credentials.client_email || !calendarId) {
      console.error('Missing Google Calendar credentials or calendar ID');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Calendar service not configured' }),
      };
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
      colorId: '6', // Tangerine/gold-ish
    };

    await calendar.events.insert({
      calendarId,
      resource: calendarEvent,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Appointment booked successfully' }),
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create appointment' }),
    };
  }
};

function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}
