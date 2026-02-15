import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import EmailModel from "@/app/model/EmailModel";

/* ======================
   GET → Fetch Primary Email
====================== */
export async function GET() {
  try {
    await dbConnect();

    // Find the document containing the emails array
    const emailDoc = await EmailModel.findOne();
    
    if (!emailDoc || !emailDoc.emails || emailDoc.emails.length === 0) {
      return NextResponse.json(
        { message: "No email addresses found" },
        { status: 404 }
      );
    }

    // Find the email object where isPrimary is true
    const primaryEmail = emailDoc.emails.find(
      (e) => e.isPrimary === true
    );

    if (!primaryEmail) {
      return NextResponse.json(
        { message: "No primary email set" },
        { status: 404 }
      );
    }

    // Return the cleaned data
    return NextResponse.json({
      label: primaryEmail.label,
      email: primaryEmail.email,
    });
  } catch (error) {
    console.error("Fetch Primary Email Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}