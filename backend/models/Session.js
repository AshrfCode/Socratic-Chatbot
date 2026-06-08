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
      required: true,
    },

    group: {
      type: String,
      default: "Experimental Group",
    },

    currentLayer: {
      type: String,
      default: "Broad Context",
    },

    hintsUsed: {
      type: Number,
      default: 1,
    },

    unlockedGates: {
      type: [String],
      default: ["Goal defined", "Stakeholders identified"],
    },

    status: {
      type: String,
      default: "In Progress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);