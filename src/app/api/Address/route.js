import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import AddressModel from "@/app/model/AddressModel";

/* ======================
   POST → Add Address
====================== */
export async function POST(req) {
  try {
    await dbConnect();
    const { label, addressText, mapEmbedUrl, isLive } = await req.json();

    if (!addressText || !mapEmbedUrl) {
      return NextResponse.json(
        { message: "Address text & map embed URL required" },
        { status: 400 }
      );
    }

    const addressDoc =
      (await AddressModel.findOne()) || (await AddressModel.create({}));

    // If new address is live → disable all others
    if (isLive) {
      addressDoc.addresses.forEach(addr => (addr.isLive = false));
    }

    addressDoc.addresses.push({
      label,
      addressText,
      mapEmbedUrl,
      isLive: !!isLive,
    });

    await addressDoc.save();

    return NextResponse.json(
      { message: "Address added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ======================
   GET → List Addresses
====================== */
export async function GET() {
  await dbConnect();
  const data = await AddressModel.findOne();
  return NextResponse.json(data?.addresses || []);
}

/* ======================
   PUT → Make Address Live
====================== */
export async function PUT(req) {
  await dbConnect();
  const { index } = await req.json();

  const addressDoc = await AddressModel.findOne();
  if (!addressDoc) {
    return NextResponse.json({ message: "No addresses found" }, { status: 404 });
  }

  addressDoc.addresses.forEach((addr, i) => {
    addr.isLive = i === index;
  });

  await addressDoc.save();
  return NextResponse.json({ message: "Live address updated" });
}

/* ======================
   DELETE → Remove Address
====================== */
export async function DELETE(req) {
  await dbConnect();
  const { index } = await req.json();

  const addressDoc = await AddressModel.findOne();
  if (!addressDoc) {
    return NextResponse.json({ message: "No addresses found" }, { status: 404 });
  }

  addressDoc.addresses.splice(index, 1);
  await addressDoc.save();

  return NextResponse.json({ success: true });
}
