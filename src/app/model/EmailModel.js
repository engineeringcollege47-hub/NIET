import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  label: { type: String, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  isPrimary: { type: Boolean, default: false },
}, { _id: true }); // Keep _id for easier tracking, or set false if preferred

const WebEmailSchema = new mongoose.Schema({
  emails: [EmailSchema], 
}, { timestamps: true });

export default mongoose.models.WebEmail || mongoose.model("WebEmail", WebEmailSchema);