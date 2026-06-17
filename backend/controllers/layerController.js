const Session = require("../models/Session");

const layers = [
  {
    name: "Broad Context",
    order: 1,
    requirements: [
      "Goal defined",
      "Three stakeholders identified",
      "Opponent identified",
      "System boundaries defined",
      "Assumption stated",
    ],
  },
  {
    name: "Structure",
    order: 2,
    requirements: [
      "Three components identified",
      "Influence chain created",
    ],
  },
  {
    name: "Dynamics",
    order: 3,
    requirements: [
      "Normal scenario described",
      "Stress scenario described",
      "Feedback loop identified",
      "Delay identified",
    ],
  },
  {
    name: "Evaluation",
    order: 4,
    requirements: [
      "Three metrics defined",
      "Target values defined",
      "Two alternatives compared",
      "Tradeoff identified",
      "Risk identified",
      "Mitigation suggested",
    ],
  },
];

async function getLayers(req, res) {
  res.json(layers);
}

async function checkLayer(req, res) {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const currentLayer = layers.find(
      (layer) => layer.name === session.currentLayer
    );

    const completed = currentLayer.requirements.every((requirement) =>
      session.unlockedGates.includes(requirement)
    );

    res.json({
      currentLayer: session.currentLayer,
      unlockedGates: session.unlockedGates,
      completed,
      requirements: currentLayer.requirements,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check layer",
      error: error.message,
    });
  }
}

module.exports = {
  getLayers,
  checkLayer,
};