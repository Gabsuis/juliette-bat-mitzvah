import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      // Google Apps Script returns a 302 redirect on POST requests.
      // We need to follow the redirect manually.
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
      });

      // Google Apps Script may return 302 -> 200, or directly 200.
      // Any 2xx or 3xx with a successful redirect is fine.
      if (!response.ok && response.status !== 302) {
        console.error('Google Sheets response:', response.status, await response.text().catch(() => ''));
        throw new Error(`Failed to submit to Google Sheets (status: ${response.status})`);
      }
    } else {
      // For development/testing - just log the data
      console.log('RSVP Submission:', data);
    }

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
