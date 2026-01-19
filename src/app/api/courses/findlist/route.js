import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import CourseModel from "@/app/model/CourseModel";

// GET → course title with subjects
export async function GET() {
  await dbConnect();

  const courses = await CourseModel.find(
    { isActive: true },
    {
      title: 1,
      descriptionPoints: 1,
      _id: 0,
    }
  ).sort({ createdAt: -1 });

  return NextResponse.json(courses);
}
