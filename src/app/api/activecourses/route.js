import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import CourseModel from "@/app/model/CourseModel";

/* =========================
   GET (List Active Courses)
========================= */
export async function GET() {
  await dbConnect();

  const courses = await CourseModel
    .find({ isActive: true })   // 👈 only active
    .sort({ createdAt: -1 });

  return NextResponse.json(courses);
}
