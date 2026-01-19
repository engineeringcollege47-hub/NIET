import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MobileModel from "@/app/model/MobileModel";

/* ======================
   POST → Add Mobile Number
====================== */
export async function POST(req) {
  try {
    await dbConnect();
    const { label, mobileNumber, isPrimary } = await req.json();

    if (!mobileNumber) {
      return NextResponse.json(
        { message: "Mobile number is required" },
        { status: 400 }
      );
    }

    const phoneDoc =
      (await MobileModel.findOne()) || (await MobileModel.create({}));

    // If new number is primary → disable others
    if (isPrimary) {
      phoneDoc.mobileNumbers.forEach(num => (num.isPrimary = false));
    }

    phoneDoc.mobileNumbers.push({
      label,
      mobileNumber,
      isPrimary: !!isPrimary,
    });

    await phoneDoc.save();

    return NextResponse.json(
      { message: "Mobile number added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* ======================
   GET → List Mobile Numbers
====================== */
export async function GET() {
  await dbConnect();
  const data = await MobileModel.findOne();
  return NextResponse.json(data?.mobileNumbers || []);
}

/* ======================
   PUT → Make Mobile Primary
====================== */
export async function PUT(req) {
  await dbConnect();
  const { index } = await req.json();

  const phoneDoc = await MobileModel.findOne();
  if (!phoneDoc) {
    return NextResponse.json(
      { message: "No mobile numbers found" },
      { status: 404 }
    );
  }

  phoneDoc.mobileNumbers.forEach((num, i) => {
    num.isPrimary = i === index;
  });

  await phoneDoc.save();
  return NextResponse.json({ message: "Primary mobile updated" });
}

/* ======================
   DELETE → Remove Mobile Number
====================== */
export async function DELETE(req) {
  await dbConnect();
  const { index } = await req.json();

  const phoneDoc = await MobileModel.findOne();
  if (!phoneDoc) {
    return NextResponse.json(
      { message: "No mobile numbers found" },
      { status: 404 }
    );
  }

  phoneDoc.mobileNumbers.splice(index, 1);
  await phoneDoc.save();

  return NextResponse.json({ success: true });
}
