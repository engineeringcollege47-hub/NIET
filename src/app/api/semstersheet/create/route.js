import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import SemsterModel from "@/app/model/SemsterModel";

/* =========================
   POST → CREATE MARKSHEET (NO UPDATE)
========================= */
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    /* =========================
       REQUIRED FIELDS
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
      "status",
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
      if (!subject.subject || !subject.code || subject.marks === undefined) {
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
       DUPLICATE CHECK
       (Enrollment + Semester)
    ========================= */
    const existing = await SemsterModel.findOne({
      enrollment: data.enrollment,
      semester: data.semester,
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Marksheet already exists for this enrollment and semester",
        },
        { status: 409 }
      );
    }

    /* =========================
       CALCULATE TOTALS
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
       CREATE PAYLOAD
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
       CREATE ONLY (NO UPDATE)
    ========================= */
    const marksheet = await SemsterModel.create(payload);

    return NextResponse.json(
      {
        message: "✅ Marksheet created successfully",
        id: marksheet._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Marksheet create error:", error);

    return NextResponse.json(
      {
        message: error.message || "Failed to create marksheet",
      },
      { status: 500 }
    );
  }
}
