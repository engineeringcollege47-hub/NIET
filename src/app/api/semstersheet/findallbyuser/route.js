import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import SemsterModel from "@/app/model/SemsterModel";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const enrollment = searchParams.get("enrollment"); // REQUIRED
    const status = searchParams.get("status"); // optional
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // ❌ Enrollment is mandatory
    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment number is required" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    /* ======================
       FILTER → ONLY ONE USER
    ====================== */
    const filter = { enrollment };

    if (status) {
      filter.status = status;
    }

    const total = await SemsterModel.countDocuments(filter);

    const data = await SemsterModel.find(filter)
      .sort({ semester: 1 })       // semester-wise order
      .skip(skip)
      .limit(limit);

    if (!data.length) {
      return NextResponse.json(
        { message: "No marksheets found for this enrollment" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch SemsterModel error:", error);
    return NextResponse.json(
      { message: "Failed to fetch semester marksheets" },
      { status: 500 }
    );
  }
}
