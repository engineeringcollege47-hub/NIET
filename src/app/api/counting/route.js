import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";

import MarksheetModel from "@/app/model/MarksheetModel";
import CourseModel from "@/app/model/CourseModel";
import AddressModel from "@/app/model/AddressModel";
import AdmissionModel from "@/app/model/AdmissionModel";
import ContactModel from "@/app/model/ContactModel";

export async function GET() {
  try {
    await dbConnect();

    // ==========================
    // ADDRESS COUNT (ARRAY BASED)
    // ==========================
    const addressAgg = await AddressModel.aggregate([
      {
        $project: {
          addressCount: { $size: "$addresses" },
        },
      },
      {
        $group: {
          _id: null,
          totalAddresses: { $sum: "$addressCount" },
        },
      },
    ]);

    const totalAddresses = addressAgg[0]?.totalAddresses || 0;

    // ==========================
    // OTHER COUNTS
    // ==========================
    const [
      totalCourses,
      totalMarksheets,
      totalEnquiries,
      pendingAdmissions,
      approvedAdmissions,
    ] = await Promise.all([
      CourseModel.countDocuments(),
      MarksheetModel.countDocuments(),
      ContactModel.countDocuments(),
      AdmissionModel.countDocuments({ isActive: true }),   // Pending
      AdmissionModel.countDocuments({ isActive: false }),  // Approved
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          approvedAdmissions,
          pendingAdmissions,
          totalCourses,
          totalEnquiries,
          totalMarksheets,
          totalAddresses, // ✅ Correct array count
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard Count Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard counts",
      },
      { status: 500 }
    );
  }
}
