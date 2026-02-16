import { NextResponse } from "next/server";

import LockModel from "@/app/model/LockFile";
import UserModel from "@/app/model/UserModel";
import dbConnect from "@/app/lib/dbConnect";


export async function POST(request) {
    await dbConnect();
    const { Id, plainpassword } = await request.json();

    // 1. Verify Admin Password (usertype "2")
    const admin = await UserModel.findOne({ plainpassword, usertype: "2" });
    if (!admin) {
        return NextResponse.json({ error: "Invalid Admin Password" }, { status: 401 });
    }

    // 2. Toggle Logic
    const existingLock = await LockModel.findOne({ Id });

    if (existingLock) {
        await LockModel.deleteOne({ Id });
        return NextResponse.json({ message: "Unlocked successfully", status: "unlocked" });
    } else {
        await LockModel.create({ Id, defaultdata: "Lock" });
        return NextResponse.json({ message: "Locked successfully", status: "locked" });
    }
}