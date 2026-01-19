import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import AdmissionModel from "@/app/model/AdmissionModel";

/* ======================
   GET → Registration Detail
   Params: enrollmentNumber, dob
====================== */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const enrollmentNumber = searchParams.get("enrollmentNumber");
    const dob = searchParams.get("dob");

    /* ----------------------
       VALIDATION
    ---------------------- */
    if (!enrollmentNumber || !dob) {
      return NextResponse.json(
        { error: "Enrollment number and DOB are required" },
        { status: 400 }
      );
    }

    // Convert DOB string to Date (yyyy-mm-dd from frontend)
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date of birth format" },
        { status: 400 }
      );
    }

    /* ----------------------
       FIND RECORD (SECURE)
    ---------------------- */
    const admission = await AdmissionModel.findOne({
      enrollmentNumber,
      dob: dobDate,

    }).select({
      enrollmentNumber: 1,
      programme: 1,
      admissionDate: 1,
      rollNumber: 1,
      name: 1,
      fatherName: 1,
      motherName: 1,
      dob: 1,
      mobile: 1,
      email: 1,
      presentAddress: 1,
      examOption: 1,
      paymentOption: 1,
      paymentStatus: 1,
      enrollStatus: 1,
      isActive: 1,
    });
    
    if (!admission) {
      return NextResponse.json(
        { error: "No record found. Please check details." },
        { status: 404 }
      );
    }

    /* ----------------------
       SUCCESS RESPONSE
    ---------------------- */
    return NextResponse.json({
      success: true,
      data: admission,
    });
  } catch (error) {
    console.error("Registration Detail Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
