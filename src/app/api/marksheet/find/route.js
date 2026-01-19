import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Marksheet from "@/app/model/MarksheetModel";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || ""; // DRAFT / PUBLISHED

    const skip = (page - 1) * limit;

    /* ======================
       FILTER
    ====================== */
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
        { enrollment: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const total = await Marksheet.countDocuments(filter);

    const data = await Marksheet.find(filter)
      
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
    console.error("Fetch marksheet error:", error);
    return NextResponse.json(
      { message: "Failed to fetch marksheets" },
      { status: 500 }
    );
  }
}
