const Session = require("../models/Session");
const ControlGroupLog = require("../models/ControlGroupLog");
const { evaluateStudentMessage } = require("../services/aiEvaluationService");

async function saveControlLog(req, res) {
  try {
    const { studentId, sessionId, text } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.group !== "Control Group") {
      return res.status(403).json({
        message: "Only control group students can use this endpoint",
      });
    }

    const log = await ControlGroupLog.create({
      studentId,
      sessionId,
      text,
    });

    const updatedSession = await evaluateStudentMessage({
      studentId,
      sessionId,
      messageText: text,
    });

    res.status(201).json({
      log,
      session: updatedSession,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save control group log",
      error: error.message,
    });
  }
}

module.exports = {
  saveControlLog,
};