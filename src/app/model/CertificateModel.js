import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    // 🔹 Student Info
    enrollmentNo: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    certificateNumber: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tradename: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    institute: {
      type: String,
      required: true,
      trim: true,
    },

    profileimage: {
      type: String,
    },

    // 🔹 Address Info
    district: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    // 🔹 Certificate Info
    year: {
      type: String,
      required: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    place: {
      type: String,
      trim: true,
    },

    // 🔹 Meta
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "PUBLISHED",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate989 ||
  mongoose.model("Certificate989", CertificateSchema);
