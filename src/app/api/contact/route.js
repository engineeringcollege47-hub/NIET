import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import ContactModel from '@/app/model/ContactModel';

/* ======================
   POST → Save enquiry
====================== */
export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await ContactModel.create({ name, email, phone, message });

    return NextResponse.json(
      { message: 'Enquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

/* ======================
   GET → Admin list (Pagination)
====================== */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  const total = await ContactModel.countDocuments();

  const contacts = await ContactModel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    data: contacts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

/* ======================
   DELETE → Admin delete
====================== */
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: 'Invalid ID' },
      { status: 400 }
    );
  }

  await ContactModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
