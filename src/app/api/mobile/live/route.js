import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MobileModel from "@/app/model/MobileModel";


/* ======================
   GET → Fetch Primary Mobile
====================== */
export async function GET() {
  try {
    await dbConnect();

    const phoneDoc = await MobileModel.findOne();
    if (!phoneDoc) {
      return NextResponse.json(
        { message: "No mobile numbers found" },
        { status: 404 }
      );
    }

    const primaryMobile = phoneDoc.mobileNumbers.find(
      num => num.isPrimary
    );

    if (!primaryMobile) {
      return NextResponse.json(
        { message: "No primary mobile set" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      label: primaryMobile.label,
      mobileNumber: primaryMobile.mobileNumber,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
