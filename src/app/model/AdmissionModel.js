import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema(
  {
    enrollmentNumber: {
      type: String,
      unique: true,
      index: true,
    },

    rollNumber: {
      type: String,
      unique: true,
      index: true,
    },

    programme: { type: String, required: true },
    admissionDate: { type: Date, required: true },

    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },

    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String },

    mobile: { type: String, required: true },
    email: { type: String, required: true },

    profileImage: { type: String },

    presentAddress: { type: String, required: true },

    academicDetails: { type: String, required: true },
    highestQualification: { type: String },
    workExperience: { type: String },

    examOption: { type: String },
    paymentOption: { type: String },

    paymentStatus: { type: Boolean, default: false },
    enrollStatus: { type: Boolean, default: false },
    marksheetStatus: { type: Boolean, default: false },
    certificateStatus: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ======================
   AUTO GENERATE ENROLLMENT + ROLL NUMBER
====================== */
AdmissionSchema.pre("save", async function () {
  // 🔹 Prevent regeneration on update
  if (this.enrollmentNumber && this.rollNumber) return;

  const Admissiondata = mongoose.model("Admissiondata");
  let programmeCode = "GEN";

  if (this.programme) {
    programmeCode = this.programme
      .trim()
      .split(/\s+/)[0]   // first word
      .slice(0, 3)       // first 3 letters
      .toUpperCase();
  }
  /* -------- ENROLLMENT NUMBER -------- */
   if (!this.enrollmentNumber) {
    let exists = true;
    let enrollment;

    while (exists) {
      const randomSix = Math.floor(100000 + Math.random() * 900000);
      enrollment = `NIET-${programmeCode}-${randomSix}`;

      exists = await Admissiondata.exists({
        enrollmentNumber: enrollment,
      });
    }

    this.enrollmentNumber = enrollment;
  }

  /* -------- ROLL NUMBER (6 DIGIT UNIQUE) -------- */
  if (!this.rollNumber) {
    let unique = false;
    let roll;

    while (!unique) {
      roll = Math.floor(100000 + Math.random() * 900000).toString();

      const exists = await Admissiondata.findOne({ rollNumber: roll });

      if (!exists) unique = true;
    }

    this.rollNumber = roll;
  }
});

/* ======================
   EXPORT MODEL
====================== */
export default mongoose.models.Admissiondata ||
  mongoose.model("Admissiondata", AdmissionSchema);
