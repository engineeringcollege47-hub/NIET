import mongoose, { Schema } from "mongoose";

const LockSchema = new Schema(
    {
        Id: { type: String, required: true },
        defaultdata:{type:String,required:true,default:"Lock"}

    },
    { timestamps: true }
);

const LockModel =
    mongoose.models.Locktest || mongoose.model("Locktest", LockSchema);

export default LockModel;