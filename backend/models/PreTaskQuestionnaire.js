const mongoose = require("mongoose");

const preTaskQuestionnaireSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    consent: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      default: "",
    },
    workedInSE: {
      type: String,
      required: true,
    },
    roleAndExperience: {
      type: String,
      default: "",
    },
    studiedSE: {
      type: String,
      required: true,
    },
    usedSocraticBot: {
      type: String,
      required: true,
    },
    socraticBotExperience: {
      type: String,
      default: "",
    },
    // This Map catches all 27 Likert scale answers dynamically
    likertAnswers: {
      type: Map,
      of: String,
      required: true,
    },
    openQ1: {
      type: String,
      required: true,
    },
    openQ2: {
      type: String,
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