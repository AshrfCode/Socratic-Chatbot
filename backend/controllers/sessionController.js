const getDefaultData = require("../utils/getDefaultData");
const Message = require("../models/Message");

const layers = ["Broad Context", "Structure", "Dynamics", "Evaluation"];

function formatSessionResponse(student, chat, session) {
  return {
    userName: student.name,
    group: session.group,
    currentLayer: session.currentLayer,
    remainingTime: "18:42",
    hintsUsed: session.hintsUsed,
    unlockedGates: session.unlockedGates,
    chatId: chat._id,
  };
}

function getNextLayer(currentLayer) {
  const currentIndex = layers.indexOf(currentLayer);
  return layers[currentIndex + 1];
}

async function checkLayerRequirements(session, chat) {
  const messagesCount = await Message.countDocuments({
    chatId: chat._id,
    sender: "user",
  });

  if (session.currentLayer === "Broad Context") {
    return {
      allowed:
        messagesCount >= 1 &&
        session.unlockedGates.includes("Goal defined") &&
        session.unlockedGates.includes("Stakeholders identified"),
      reason:
        "You need at least one answer, goal definition, and stakeholders identification.",
    };
  }

  if (session.currentLayer === "Structure") {
    return {
      allowed: messagesCount >= 2,
      reason: "You need to describe the system structure before continuing.",
    };
  }

  if (session.currentLayer === "Dynamics") {
    return {
      allowed: messagesCount >= 3,
      reason: "You need to explain cause-and-effect or feedback loop.",
    };
  }

  return {
    allowed: false,
    reason: "No next layer available.",
  };
}

async function getSession(req, res) {
  try {
    const { student, chat, session } = await getDefaultData();
    res.json(formatSessionResponse(student, chat, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to load session",
      error: error.message,
    });
  }
}

async function increaseHint(req, res) {
  try {
    const { student, chat, session } = await getDefaultData();

    session.hintsUsed += 1;
    await session.save();

    res.json(formatSessionResponse(student, chat, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to increase hints",
      error: error.message,
    });
  }
}

async function moveToNextLayer(req, res) {
  try {
    const { student, chat, session } = await getDefaultData();

    const nextLayer = getNextLayer(session.currentLayer);

    if (!nextLayer) {
      return res.status(400).json({
        message: "All layers completed",
      });
    }

    const result = await checkLayerRequirements(session, chat);

    if (!result.allowed) {
      return res.status(400).json({
        message: "Layer requirements not met",
        reason: result.reason,
        currentLayer: session.currentLayer,
      });
    }

    session.currentLayer = nextLayer;

    if (!session.unlockedGates.includes(nextLayer)) {
      session.unlockedGates.push(nextLayer);
    }

    await session.save();

    res.json(formatSessionResponse(student, chat, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to move to next layer",
      error: error.message,
    });
  }
}

module.exports = {
  getSession,
  increaseHint,
  moveToNextLayer,
};