import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const { name, username, email, phone, password, usertype } = await req.json();

        // -------- Validation --------
        if (!name || !username || !email || !phone || !password) {
            return Response.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        // -------- Check Existing User --------
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return Response.json(
                { message: "User already registered with this email", success: false },
                { status: 400 }
            );
        }

        // -------- Hash Password --------
        const hashedPassword = await bcrypt.hash(password, 10);

        // -------- Create User --------
        await UserModel.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
            plainpassword: password,    
            usertype: usertype || "1",
            defaultdata: "User"        
        });

        return Response.json(
            { message: "User created successfully!", success: true },
            { status: 201 }
        );

    } catch (error) {
        console.error("Register Error:", error);

        return Response.json(
            { message: "Error in registering user", success: false },
            { status: 500 }
        );
    }
}
