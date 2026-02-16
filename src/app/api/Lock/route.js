import { NextResponse } from "next/server";
import LockModel from "@/app/model/LockFile";
import dbConnect from "@/app/lib/dbConnect";


// GET: Fetch all locks
export async function GET() {
    try {
        await dbConnect();
        const locks = await LockModel.find({});
        return NextResponse.json({ success: true, data: locks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Toggle Lock (Delete if exists, Add if not)
export async function POST(request) {
    try {
        await dbConnect();
        const { Id, defaultdata } = await request.json();

        if (!Id) {
            return NextResponse.json({ error: "Id is required" }, { status: 400 });
        }

        // 1. Check if the ID already exists
        const existingLock = await LockModel.findOne({ Id });

        if (existingLock) {
            // 2. If it exists, delete it
            await LockModel.deleteOne({ Id });
            return NextResponse.json({ 
                message: "Lock already existed and has been deleted", 
                action: "deleted" 
            }, { status: 200 });
        } else {
            // 3. If it doesn't exist, create it
            const newLock = await LockModel.create({ 
                Id, 
                defaultdata: defaultdata || "Lock" 
            });
            return NextResponse.json({ 
                message: "Lock created successfully", 
                data: newLock, 
                action: "created" 
            }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}