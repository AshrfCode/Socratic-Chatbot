const Message = require("../models/Message");
const Session = require("../models/Session");
const {
  evaluateStudentAnswer,
} = require("../services/aiEvaluationService");

function formatMessage(message) {
  return {
    _id: message._id,
    chatId: message.chatId,
    sender: message.sender,
    text: message.text,
    time: message.createdAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function addGateIfMissing(session, gate) {
  if (!session.unlockedGates.includes(gate)) {
    session.unlockedGates.push(gate);
  }
}

async function getChatMessages(req, res) {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.json(messages.map(formatMessage));
  } catch (error) {
    res.status(500).json({
      message: "Failed to load chat messages",
      error: error.message,
    });
  }
}

async function addChatMessage(req, res) {
  try {
    const { chatId, sender, text } = req.body;

    if (!chatId || !sender || !text) {
      return res.status(400).json({
        message: "chatId, sender and text are required",
      });
    }

    const newMessage = await Message.create({
      chatId,
      sender,
      text,
    });

    if (sender === "user") {
      const evaluation = await evaluateStudentAnswer(text);

      const session = await Session.findOne({ chatId });

      if (session) {
        if (evaluation.goalDefined) {
          addGateIfMissing(session, "Goal defined");
        }

        if (evaluation.stakeholdersIdentified) {
          addGateIfMissing(session, "Stakeholders identified");
        }

        if (evaluation.causeEffectDetected) {
          addGateIfMissing(session, "Cause-effect identified");
        }

        if (evaluation.feedbackLoopDetected) {
          addGateIfMissing(session, "Feedback loop identified");
        }

        await session.save();
      }

      const botMessage = await Message.create({
        chatId,
        sender: "bot",
        text: evaluation.botResponse,
      });

      return res.status(201).json({
        userMessage: formatMessage(newMessage),
        botMessage: formatMessage(botMessage),
        evaluation,
      });
    }

    res.status(201).json(formatMessage(newMessage));
  } catch (error) {
    res.status(500).json({
      message: "Failed to save chat message",
      error: error.message,
    });
  }
}

module.exports = {
  getChatMessages,
  addChatMessage,
};