const PreTaskQuestionnaire = require("../models/PreTaskQuestionnaire");
const PostTaskQuestionnaire = require("../models/PostTaskQuestionnaire");

async function submitPreTask(req, res) {
  try {
    const { studentId } = req.body;

    // Check if this student already submitted the pre-task survey
    const existingSurvey = await PreTaskQuestionnaire.findOne({ studentId });
    if (existingSurvey) {
      return res.status(400).json({
        message: "Pre-task questionnaire already submitted for this session.",
      });
    }

    const questionnaire = await PreTaskQuestionnaire.create(req.body);
    res.status(201).json(questionnaire);
  } catch (error) {
    console.error("PreTask Error:", error);
    res.status(500).json({
      message: "Failed to save pre-task questionnaire",
      error: error.message,
    });
  }
}

async function submitPostTask(req, res) {
  try {
    const questionnaire = await PostTaskQuestionnaire.create(req.body);
    res.status(201).json(questionnaire);
  } catch (error) {
    console.error("PostTask Error:", error);
    res.status(500).json({
      message: "Failed to save post-task questionnaire",
      error: error.message,
    });
  }
}

module.exports = {
  submitPreTask,
  submitPostTask,
};