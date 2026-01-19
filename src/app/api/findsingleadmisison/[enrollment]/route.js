import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Admission from "@/app/model/AdmissionModel";

/* ======================
   GET → Single Admission
====================== */
export async function GET(req, context) {
  try {
    await dbConnect();

    // ✅ FIX: params is async
    const { enrollment } = await context.params;

    const admission = await Admission.findOne({
      enrollmentNumber: enrollment,
    });

    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(admission, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
