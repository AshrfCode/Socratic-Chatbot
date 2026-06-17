const StudentProgress = require("../models/StudentProgress");
const GateEvent = require("../models/GateEvent");
const Message = require("../models/Message");

async function getDashboardData(req, res) {
  try {
    const progressData = await StudentProgress.find()
      .populate("studentId")
      .sort({ updatedAt: -1 });

    const dashboard = progressData
      .filter((item) => item.studentId)
      .map((item) => ({
        progressId: item._id,
        studentName: item.studentId.name,
        studentNumber: item.studentId.studentId,
        group: item.group,
        currentLayer: item.currentLayer,
        progress: item.progress,
        status: item.status,
        hintsUsed: item.hintsUsed,
        updatedAt: item.updatedAt,
      }));

    res.json(dashboard);
  } catch (error) {
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
      (p) => p.status === "completed"
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