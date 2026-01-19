import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import CertificateModel from "@/app/model/CertificateModel";

/* ======================
   GET → Certificate BY ENROLLMENT
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
    const marksheet = await CertificateModel.findOne(
      {
        certificateNumber: enrollmentNumber,
      },
      { __v: 0 }
    );

    if (!marksheet) {
      return NextResponse.json(
        { error: "Certificate not found or not published" },
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
