import mongoose from "mongoose";

const MobileNumberSchema = new mongoose.Schema(
  {
    label: {
      type: String, // Primary / WhatsApp / Office etc.
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    isPrimary: {
      type: Boolean, // Main active number
      default: false,
    },
  },
  { _id: false }
);

const PhoneSchema = new mongoose.Schema(
  {
    mobileNumbers: {
      type: [MobileNumberSchema], // Multiple mobile numbers
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Phone1 ||
  mongoose.model("Phone1", PhoneSchema);
