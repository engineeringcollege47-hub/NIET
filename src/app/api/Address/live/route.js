import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import AddressModel from "@/app/model/AddressModel";

/* ======================
   GET → Fetch Live Address
====================== */
export async function GET() {
  try {
    await dbConnect();

    const addressDoc = await AddressModel.findOne();
    if (!addressDoc) {
      return NextResponse.json(
        { message: "No address found" },
        { status: 404 }
      );
    }

    const liveAddress = addressDoc.addresses.find(addr => addr.isLive);

    if (!liveAddress) {
      return NextResponse.json(
        { message: "No live address set" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      addressText: liveAddress.addressText,
      mapEmbedUrl: liveAddress.mapEmbedUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
