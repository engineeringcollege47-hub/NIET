import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MarksheetModel from "@/app/model/MarksheetModel";
import SemsterModel from "@/app/model/SemsterModel";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const enrollmentNumber = searchParams.get("enrollmentNumber");

    if (!enrollmentNumber) {
      return NextResponse.json(
        { error: "Enrollment number is required" },
        { status: 400 }
      );
    }

    // 1. Try finding in MarksheetModel first (Published only)
    let resultData = await MarksheetModel.findOne(
      { rollNumber: enrollmentNumber, status: "PUBLISHED" },
      { __v: 0 }
    );

    // 2. Fallback: Try finding in SemsterModel if not found in Marksheet
    if (!resultData) {
      resultData = await SemsterModel.findOne(
        { rollNumber: enrollmentNumber, status: "PUBLISHED" },
        { __v: 0 }
      );
    }

    if (!resultData) {
      return NextResponse.json(
        { error: "Result not found or not yet published" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: resultData,
    });
  } catch (error) {
    console.error("Result Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}