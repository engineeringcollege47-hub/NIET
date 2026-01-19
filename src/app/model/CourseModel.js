import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // CloudFront URL
      required: true,
    },

      descriptionPoints: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        code: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Course1 ||
  mongoose.model("Course1", CourseSchema);
