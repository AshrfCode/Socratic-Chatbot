const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    currentLayer: {
      type: String,
      enum: ["Broad Context", "Structure", "Dynamics", "Evaluation"],
      default: "Broad Context",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["active", "completed", "needs work"],
      default: "active",
    },

    hintsUsed: {
      type: Number,
      default: 0,
    },

    group: {
      type: String,
      enum: ["Experimental Group", "Control Group"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentProgress", studentProgressSchema);