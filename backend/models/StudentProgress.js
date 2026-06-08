import mongoose from "mongoose";

const studentProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    currentLayer: {
      type: String,
      default: "Layer 1",
    },

    hintsUsed: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "stuck", "completed"],
      default: "active",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudentProgress", studentProgressSchema);