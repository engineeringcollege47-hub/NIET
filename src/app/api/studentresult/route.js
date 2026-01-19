import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MarksheetModel from "@/app/model/MarksheetModel";

/* ======================
   GET → RESULT BY ENROLLMENT
====================== */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const enrollmentNumber = searchParams.get("enrollmentNumber");

    /* ----------------------
       VALIDATION
    ---------------------- */
    if (!enrollmentNumber) {
      return NextResponse.json(
        { error: "Enrollment number is required" },
        { status: 400 }
      );
    }

    /* ----------------------
       FIND MARKSHEET
       (ONLY PUBLISHED)
    ---------------------- */
    const marksheet = await MarksheetModel.findOne(
      {
        enrollment: enrollmentNumber,
        status: "PUBLISHED",
      },
      { __v: 0 }
    );

    if (!marksheet) {
      return NextResponse.json(
        { error: "Result not found or not published" },
        { status: 404 }
      );
    }

    /* ----------------------
       SUCCESS RESPONSE
    ---------------------- */
    return NextResponse.json({
      success: true,
      data: marksheet,
    });
  } catch (error) {
    console.error("Marksheet Fetch Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
