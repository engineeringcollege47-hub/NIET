import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import EmailModel from "@/app/model/EmailModel";

export async function POST(req) {
  try {
    await dbConnect();
    const { label, email, isPrimary } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find the doc or create one if it doesn't exist
    let emailDoc = await EmailModel.findOne();
    if (!emailDoc) emailDoc = await EmailModel.create({ emails: [] });

    // If this one is primary, set all others to false
    if (isPrimary) {
      emailDoc.emails.forEach(e => (e.isPrimary = false));
    }

    emailDoc.emails.push({ label, email, isPrimary: !!isPrimary });
    await emailDoc.save();

    return NextResponse.json({ message: "Email added successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const data = await EmailModel.findOne();
  return NextResponse.json(data?.emails || []);
}

export async function PUT(req) {
  await dbConnect();
  const { index } = await req.json();
  const emailDoc = await EmailModel.findOne();

  if (emailDoc && emailDoc.emails[index]) {
    emailDoc.emails.forEach((e, i) => (e.isPrimary = i === index));
    await emailDoc.save();
    return NextResponse.json({ message: "Primary email updated" });
  }
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function DELETE(req) {
  await dbConnect();
  const { index } = await req.json();
  const emailDoc = await EmailModel.findOne();

  if (emailDoc) {
    emailDoc.emails.splice(index, 1);
    await emailDoc.save();
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}