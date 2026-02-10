import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import SemsterModel from "@/app/model/SemsterModel";

/* =========================
   DELETE → REMOVE MARKSHEET
========================= */
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const enrollment = searchParams.get("enrollment");
    const semester = searchParams.get("semester");

    /* =========================
       VALIDATION
    ========================= */
    if (!enrollment || !semester) {
      return NextResponse.json(
        { message: "Enrollment and semester are required" },
        { status: 400 }
      );
    }

    /* =========================
       DELETE MARKSHEET
    ========================= */
    const deleted = await SemsterModel.findOneAndDelete({
      enrollment,
      semester,
    });

    if (!deleted) {
      return NextResponse.json(
        { message: "Marksheet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "🗑️ Marksheet deleted successfully",
        id: deleted._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Marksheet delete error:", error);

    return NextResponse.json(
      { message: error.message || "Failed to delete marksheet" },
      { status: 500 }
    );
  }
}
