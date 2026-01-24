import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Marksheet from "@/app/model/MarksheetModel";
import AdmissionModel from "@/app/model/AdmissionModel";

/* =========================
   POST → CREATE / UPDATE MARKSHEET
========================= */
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    /* =========================
       BASIC REQUIRED FIELDS
    ========================= */
    const requiredFields = [
      "name",
      "fatherName",
      "dob",
      "rollNumber",
      "enrollment",
      "session",
      "semester",
      "issueDate",
      "title1",
      "title2",
      "city",
      "status"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    /* =========================
       SUBJECT VALIDATION
    ========================= */
    if (!Array.isArray(data.subjects) || data.subjects.length === 0) {
      return NextResponse.json(
        { message: "At least one subject is required" },
        { status: 400 }
      );
    }

    for (const subject of data.subjects) {
      if (
        !subject.subject ||
        !subject.code ||
        subject.marks === undefined
      ) {
        return NextResponse.json(
          {
            message:
              "Each subject must include subject name, code, and marks",
          },
          { status: 400 }
        );
      }
    }

    /* =========================
       CALCULATE TOTALS (SAFETY)
    ========================= */
    const total = data.subjects.reduce(
      (sum, s) => sum + Number(s.marks || 0),
      0
    );

    const maxTotal = data.subjects.reduce(
      (sum, s) => sum + Number(s.max || 100),
      0
    );

    const percentage = maxTotal
      ? Number(((total / maxTotal) * 100).toFixed(2))
      : 0;

    const grade =
      percentage >= 75
        ? "A"
        : percentage >= 60
        ? "B"
        : percentage >= 45
        ? "C"
        : "D";

    /* =========================
       PREPARE FINAL PAYLOAD
    ========================= */
    const payload = {
      ...data,
      total,
      maxTotal,
      percentage,
      grade,
      status: data.status || "PUBLISHED",
    };

    /* =========================
       SAVE / UPDATE MARKSHEET
    ========================= */
    const marksheet = await Marksheet.findOneAndUpdate(
      { enrollment: data.enrollment },
      { $set: payload },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    /* =========================
       UPDATE ADMISSION STATUS
    ========================= */
    await AdmissionModel.findOneAndUpdate(
      { enrollmentNumber: data.enrollment },
      { $set: { marksheetStatus: true } },
      { new: true }
    );

    /* =========================
       SUCCESS RESPONSE
    ========================= */
    return NextResponse.json(
      {
        message: "✅ Marksheet saved successfully",
        id: marksheet._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Marksheet save error:", error);

    return NextResponse.json(
      {
        message: error.message || "Failed to save marksheet",
      },
      { status: 500 }
    );
  }
}
