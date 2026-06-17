const mongoose = require("mongoose");

const preTaskQuestionnaireSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousExperience: {
      type: String,
      default: "",
    },

    chatbotComfort: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    topicFamiliarity: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    yearsExperience: {
      type: Number,
      default: 0,
    },

    demographics: {
      type: String,
      default: "",
    },

    selfRatedSystemsThinking: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PreTaskQuestionnaire",
  preTaskQuestionnaireSchema
);