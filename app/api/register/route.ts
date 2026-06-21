import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,

      // YOUR SHEET TAB NAME
      range: "'Delegate_Registrations'!A:AF",

      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            new Date().toISOString(),
            body.delegationType || "Single",
            body.name,
            body.institution || "",
            body.email,
            body.gender,
            body.phone,
            body.whatsapp,
            body.name2 || "",
            body.institution2 || "",
            body.email2 || "",
            body.gender2 || "",
            body.phone2 || "",
            body.whatsapp2 || "",
            body.previousMUNs,
            body.experience,
            body.committee1,
            body.committee1Portfolio1,
            body.committee1Portfolio2,
            body.committee1Portfolio3,
            body.committee2,
            body.committee2Portfolio1,
            body.committee2Portfolio2,
            body.committee2Portfolio3,
            body.committee3 || "",
            body.committee3Portfolio1 || "",
            body.committee3Portfolio2 || "",
            body.committee3Portfolio3 || "",
            body.foodPreference1 || "Veg",
            body.foodPreference2 || "",
            body.accommodation,
            body.queries,
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
      },
      {
        status: 500,
      },
    );
  }
}
