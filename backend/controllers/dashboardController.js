const getDefaultData = require("../utils/getDefaultData");

async function getDashboard(req, res) {
  try {
    const { student, session } = await getDefaultData();

    res.json([
      {
        name: student.name,
        layer: session.currentLayer,
        hints: session.hintsUsed,
        status: session.status,
      },
    ]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
}

module.exports = {
  getDashboard,
};