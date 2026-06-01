import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key:
          process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },

      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,

      range: "'Executive_Registrations'!A:L",

      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            body.name,
            body.institute,
            body.email,
            body.gender,
            body.phone,
            body.whatsapp,
            body.totalExperience,
            body.previousExperience,
            body.committeePref1,
            body.position1,
            body.committeePref2,
            body.position2,
          ],
        ],
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit registration",
      },
      {
        status: 500,
      }
    );
  }
}
