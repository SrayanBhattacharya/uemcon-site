import { google } from "googleapis";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  "application/pdf",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      institute,
      email,
      gender,
      phone,
      whatsapp,
      totalExperience,
      previousExperience,
      committeePref1,
      position1,
      committeePref2,
      position2,
      resume,
      resumeFilename,
      resumeMimetype,
    } = body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume file is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!resumeMimetype) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(resumeMimetype)) {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF and DOCX files are allowed",
        },
        {
          status: 400,
        }
      );
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        "Supabase credentials are missing"
      );
    }

    const base64Data = resume
      .split(";base64,")
      .pop();

    if (!base64Data) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid resume format",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = Buffer.from(
      base64Data,
      "base64"
    );

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Resume size must be under 5MB",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Google Auth (Sheets only)
    // -----------------------------

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email:
          process.env.GOOGLE_CLIENT_EMAIL,

        private_key:
          process.env.GOOGLE_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
      },

      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    // -----------------------------
    // Supabase Storage Upload
    // -----------------------------

    const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseBucket = process.env.SUPABASE_BUCKET || "uemcon-resumes";

    const safeName = String(name || "Unknown")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    const extension =
      resumeMimetype ===
      "application/pdf"
        ? "pdf"
        : "docx";

    const fileName = `${safeName}_Resume_${Date.now()}.${extension}`;

    const uploadUrl = `${supabaseUrl}/storage/v1/object/${supabaseBucket}/${fileName}`;
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "apikey": supabaseServiceKey,
        "Content-Type": resumeMimetype,
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      const responseText = await uploadResponse.text();
      throw new Error(
        `Failed to upload resume to Supabase Storage: ${responseText}`
      );
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${fileName}`;

    // -----------------------------
    // Google Sheets Append
    // -----------------------------

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId:
        process.env.GOOGLE_SHEET_ID,

      range:
        "'Executive_Registrations'!A:M",

      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            name,
            institute,
            email,
            gender,
            phone,
            whatsapp,
            totalExperience,
            previousExperience,
            committeePref1,
            position1,
            committeePref2,
            position2,
            publicUrl,
          ],
        ],
      },
    });

    // -----------------------------
    // Success Response
    // -----------------------------

    return NextResponse.json({
      success: true,
      fileLink: publicUrl,
    });

  } catch (error: any) {
    console.error(
      "Registration submission failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error?.message ||
          "Failed to submit registration",
      },

      {
        status: 500,
      }
    );
  }
}
