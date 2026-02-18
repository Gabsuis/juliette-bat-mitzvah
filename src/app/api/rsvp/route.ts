import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Sheets');
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

/*
=== GOOGLE APPS SCRIPT FOR YOUR GOOGLE SHEET ===
Copy this script to your Google Sheet's Apps Script editor:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Confirmation Site");
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.message,
      data.service,
      data.kiddush,
      data.party
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

Deploy as:
- Execute as: Me
- Who has access: Anyone

*/
