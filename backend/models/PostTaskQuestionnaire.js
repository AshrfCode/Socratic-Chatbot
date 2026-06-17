const mongoose = require("mongoose");

const postTaskQuestionnaireSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    didBotGiveAnswers: {
      type: Boolean,
      required: true,
    },

    didQuestionsHelpThinking: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    perceivedEffort: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    satisfaction: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PostTaskQuestionnaire",
  postTaskQuestionnaireSchema
);