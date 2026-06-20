const Chat = require("../models/Chat");
const Session = require("../models/Session");
const Message = require("../models/Message");
const ControlGroupLog = require("../models/ControlGroupLog");
const StudentProgress = require("../models/StudentProgress");

const {
  generateSocraticResponse,
  generateSocraticHint,
} = require("../services/openaiService");

const {
  evaluateStudentMessage,
} = require("../services/aiEvaluationService");

async function getChatMessages(req, res) {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load messages",
      error: error.message,
    });
  }
}

async function sendMessage(req, res) {
  try {
    const { chatId } = req.params;
    const { sessionId, studentId, text } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const userMessage = await Message.create({
      chatId,
      sessionId,
      studentId,
      sender: "user",
      text,
      layer: session.currentLayer,
    });

    if (session.group === "Control Group") {
      await ControlGroupLog.create({
        studentId,
        sessionId,
        text,
      });

      const updatedSession = await evaluateStudentMessage({
        studentId,
        sessionId,
        messageText: text,
      });

      return res.json({
        userMessage,
        botMessage: null,
        session: updatedSession,
        controlGroup: true,
      });
    }

    const chatHistory = await Message.find({ chatId }).sort({ timestamp: 1 });

    const progressDoc = await StudentProgress.findOne({ sessionId });

    const botText = await generateSocraticResponse({
      studentMessage: text,
      currentLayer: session.currentLayer,
      chatHistory,
      unlockedGates: session.unlockedGates,
      progress: progressDoc?.progress || 0,
      hintsUsed: session.hintsUsed,
      lastBotQuestions: session.lastBotQuestions,
    });

    const botMessage = await Message.create({
      chatId,
      sessionId,
      studentId,
      sender: "bot",
      text: botText,
      layer: session.currentLayer,
    });

    if (!session.lastBotQuestions) {
      session.lastBotQuestions = [];
    }

    session.lastBotQuestions.push(botText);

    if (session.lastBotQuestions.length > 10) {
      session.lastBotQuestions.shift();
    }

    await session.save();

    const updatedSession = await evaluateStudentMessage({
      studentId,
      sessionId,
      messageText: text,
    });

    res.json({
      userMessage,
      botMessage,
      session: updatedSession,
      controlGroup: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
}

async function getHint(req, res) {
  try {
    const { chatId } = req.params;
    const { sessionId, studentId } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.group === "Control Group") {
      return res.status(403).json({
        message: "Control group cannot use AI hints",
      });
    }

    const hintText = await generateSocraticHint({
      currentLayer: session.currentLayer,
      hintsUsed: session.hintsUsed,
      unlockedGates: session.unlockedGates,
    });

    session.hintsUsed += 1;
    await session.save();

    const hintMessage = await Message.create({
      chatId,
      sessionId,
      studentId,
      sender: "bot",
      text: hintText,
      layer: session.currentLayer,
    });

    await StudentProgress.findOneAndUpdate(
      { sessionId },
      {
        hintsUsed: session.hintsUsed,
      },
      { new: true }
    );

    res.json({
      hintMessage,
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate hint",
      error: error.message,
    });
  }
}

module.exports = {
  getChatMessages,
  sendMessage,
  getHint,
};