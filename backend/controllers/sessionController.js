const User = require("../models/User");
const Session = require("../models/Session");
const Chat = require("../models/Chat");
const StudentProgress = require("../models/StudentProgress");

function assignRandomGroup() {
  return Math.random() < 0.5 ? "Experimental Group" : "Control Group";
}

async function startSession(req, res) {
  try {
    const { name, studentId, email , role } = req.body;
if (role === "researcher") {
  return res.status(403).json({
    message: "Researchers must login through researcher login endpoint",
  });
}
    if (!name || !studentId) {
      return res.status(400).json({
        message: "Name and student ID are required",
      });
    }

    let user = await User.findOne({ studentId });

    if (!user) {
     user = await User.create({
  name,
  studentId,
  email,
  role: role || "student",
  group: role === "researcher" ? "Experimental Group" : assignRandomGroup(),
});
    }

    let session = await Session.findOne({
      studentId: user._id,
      status: "active",
    });

    if (!session) {
      session = await Session.create({
        studentId: user._id,
        group: user.group,
      });

      const chat = await Chat.create({
        studentId: user._id,
        sessionId: session._id,
        title: `${user.name} - SystemThinker Chat`,
      });

      session.chatId = chat._id;
      await session.save();

      await StudentProgress.create({
        studentId: user._id,
        sessionId: session._id,
        currentLayer: session.currentLayer,
        progress: 0,
        hintsUsed: 0,
        group: user.group,
      });
    }

    res.json(formatSessionResponse(user, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to start session",
      error: error.message,
    });
  }
}

async function getSession(req, res) {
  try {
    const session = await Session.findById(req.params.sessionId).populate("studentId");

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json(formatSessionResponse(session.studentId, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to get session",
      error: error.message,
    });
  }
}

async function increaseHint(req, res) {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId).populate("studentId");

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    session.hintsUsed += 1;
    await session.save();

    await StudentProgress.findOneAndUpdate(
      { sessionId: session._id },
      { hintsUsed: session.hintsUsed },
      { new: true }
    );

    res.json(formatSessionResponse(session.studentId, session));
  } catch (error) {
    res.status(500).json({
      message: "Failed to increase hint",
      error: error.message,
    });
  }
}

function formatSessionResponse(user, session) {
  return {
    userId: user._id,
    studentId: user.studentId,
    studentName: user.name,
    email: user.email,
    sessionId: session._id,
    chatId: session.chatId,
    group: session.group,
    currentLayer: session.currentLayer,
    hintsUsed: session.hintsUsed,
    unlockedGates: session.unlockedGates,
    remainingTime: session.remainingTime,
    status: session.status,
    role: user.role,
  };
}

module.exports = {
  startSession,
  getSession,
  increaseHint,
};