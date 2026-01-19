import mongoose from "mongoose";

const SingleAddressSchema = new mongoose.Schema(
  {
    label: {
      type: String, // Home / Office / Campus etc.
      trim: true,
    },

    addressText: {
      type: String, // Human readable address
      required: true,
      trim: true,
    },

    mapEmbedUrl: {
      type: String, // Google Maps embed link
      required: true,
    },

    isLive: {
      type: Boolean, // Current active address
      default: false,
    },
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    addresses: {
      type: [SingleAddressSchema], // Multiple addresses
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);
