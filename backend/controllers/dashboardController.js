const StudentProgress = require("../models/StudentProgress");
const GateEvent = require("../models/GateEvent");
const Message = require("../models/Message");
const Session = require("../models/Session");
const PreTask = require("../models/PreTaskQuestionnaire");   
const PostTask = require("../models/PostTaskQuestionnaire"); 

async function getDashboardData(req, res) {
  try {
    const progressData = await StudentProgress.find()
      .populate("studentId")
      .sort({ updatedAt: -1 })
      .lean();

    const dashboard = await Promise.all(
      progressData
        .filter((item) => item.studentId)
        .map(async (item) => {
          
          const session = await Session.findById(item.sessionId).lean();
          
          const preTask = await PreTask.findOne({ studentId: item.studentId._id }).lean();
          const postTask = await PostTask.findOne({ studentId: item.studentId._id }).lean();

          // NEW: Fetch only THIS student's gate triggers for this session
          const gateEvents = await GateEvent.find({ 
            studentId: item.studentId._id,
            sessionId: item.sessionId
          }).sort({ createdAt: 1 }).lean(); // Sorted oldest to newest to show progression

          return {
            progressId: item._id,
            studentId: item.studentId._id,
            studentName: item.studentId.name,
            studentNumber: item.studentId.studentId,
            group: item.group,
            currentLayer: item.currentLayer,
            progress: item.progress,
            hintsUsed: item.hintsUsed,
            updatedAt: item.updatedAt,
            
            status: session ? session.status : "unknown",
            chatId: session ? session.chatId : null,
            remainingTime: session ? session.remainingTime : "00:00",
            preTask: preTask || null,
            postTask: postTask || null,
            gateEvents: gateEvents || [], // <--- Attached directly to the student!
          };
        })
    );

    res.json(dashboard);
  } catch (error) {
    console.error("🔥 Dashboard Fetch Error:", error);
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
}

async function getResearchAnalytics(req, res) {
  try {
    const progresses = await StudentProgress.find();

    const totalStudents = progresses.length;

    const completedStudents = progresses.filter(
      (p) => p.status === "completed" || p.progress === 100
    ).length;

    const experimental = progresses.filter(
      (p) => p.group === "Experimental Group"
    );

    const control = progresses.filter(
      (p) => p.group === "Control Group"
    );

    const averageHints =
      totalStudents === 0
        ? 0
        : progresses.reduce((sum, p) => sum + p.hintsUsed, 0) / totalStudents;

    const totalGateEvents = await GateEvent.countDocuments();
    const totalMessages = await Message.countDocuments();

    res.json({
      totalStudents,
      completedStudents,
      completionRate:
        totalStudents === 0
          ? 0
          : Math.round((completedStudents / totalStudents) * 100),
      experimentalCount: experimental.length,
      controlCount: control.length,
      averageHints: Math.round(averageHints * 10) / 10,
      totalGateEvents,
      totalMessages,
    });
  } catch (error) {
    console.error("🔥 Analytics Fetch Error:", error);
    res.status(500).json({
      message: "Failed to load research analytics",
      error: error.message,
    });
  }
}

module.exports = {
  getDashboardData,
  getResearchAnalytics,
};