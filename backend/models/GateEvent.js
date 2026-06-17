const mongoose = require("mongoose");

const gateEventSchema = new mongoose.Schema(
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

    layer: {
      type: String,
      required: true,
    },

    gateName: {
      type: String,
      required: true,
    },

    trigger: {
      type: String,
      required: true,
    },

    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GateEvent", gateEventSchema);