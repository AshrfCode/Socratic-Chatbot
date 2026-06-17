const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },

    group: {
      type: String,
      enum: ["Experimental Group", "Control Group"],
      required: true,
    },

    currentLayer: {
      type: String,
      enum: ["Broad Context", "Structure", "Dynamics", "Evaluation"],
      default: "Broad Context",
    },

    hintsUsed: {
      type: Number,
      default: 0,
    },

    unlockedGates: {
      type: [String],
      default: [],
    },

    remainingTime: {
      type: String,
      default: "20:00",
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
    lastBotQuestions: {
      type: [String],
      default: [],
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);