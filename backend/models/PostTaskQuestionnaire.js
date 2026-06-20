const mongoose = require("mongoose");

const postTaskQuestionnaireSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NEW: Stores the 27 systems thinking questions.
    // Using a Map allows dynamic keys (like "0", "1", "2") with String values
    likertAnswers: {
      type: Map,
      of: String, 
      required: true,
    },

    // FIX: Removed 'required: true' because the Control Group 
    // does not answer this question and sends 'null'.
    didBotGiveAnswers: {
      type: Boolean,
      default: null,
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