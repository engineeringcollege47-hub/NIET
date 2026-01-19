import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    code: { type: String, required: true },
    min: { type: Number, default: 40 },
    max: { type: Number, default: 100 },
    practicle: { type: Number, },
    marks: { type: Number, required: true },
  },
  { _id: false }
);

const SemesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "1st Sem",
        "2nd Sem",
        "3rd Sem",
        "4th Sem",
        "5th Sem",
        "6th Sem",
        "7th Sem",
        "8th Sem",
      ],
    },
    totalMarks: { type: Number, required: true },
  },
  { _id: false }
);

const MarksheetSchema = new mongoose.Schema(
  {
    // 🔹 Student Info
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    rollNumber: { type: String, required: true },
    dob: { type: String, required: true },
    enrollment: { type: String, required: true, index: true },
    profileImage: { type: String },
    title1: { type: String },
    title2: { type: String },
    // 🔹 Academic Info
    session: { type: String, required: true },
    semester: { type: String, required: true },
    examiner: { type: String },
    issueDate: { type: Date, required: true },

    semestersmark: {
      type: [SemesterSchema],
      required: true,
    },
    // 🔹 Marks
    subjects: { type: [SubjectSchema], required: true },

    total: { type: Number, required: true },
    maxTotal: { type: Number, required: true },
    percentage: { type: Number, required: true },
    grade: { type: String, required: true },
    marksInWords: { type: String, required: true },
    city: { type: String, required: true },

    // 🔹 Meta
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "PUBLISHED",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Markshet1212 ||
  mongoose.model("Markshet1212", MarksheetSchema);
