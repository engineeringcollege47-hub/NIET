import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const { email, currentPassword, newPassword } = await req.json();

        // 1. Validation
        if (!email || !currentPassword || !newPassword) {
            return Response.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        // 2. Find User
        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        // 3. Verify Current Password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return Response.json(
                { message: "Incorrect current password", success: false },
                { status: 401 }
            );
        }

        // 4. Hash New Password & Update
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        
        // Optional: Update plainpassword ONLY if you absolutely must keep it (not recommended)
        user.plainpassword = newPassword; 
        
        await user.save();

        return Response.json(
            { message: "Password updated successfully!", success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("Password Change Error:", error);
        return Response.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}