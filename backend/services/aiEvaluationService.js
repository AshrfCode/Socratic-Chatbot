const Session = require("../models/Session");
const StudentProgress = require("../models/StudentProgress");
const GateEvent = require("../models/GateEvent");
const { evaluateLayerWithGemini } = require("./geminiService");

const LAYERS = ["Broad Context", "Structure", "Dynamics", "Evaluation"];

const GATE_MAP = {
  goalDefined: "Goal defined",
  threeStakeholdersIdentified: "Three stakeholders identified",
  opponentIdentified: "Opponent identified",
  systemBoundariesDefined: "System boundaries defined",
  assumptionStated: "Assumption stated",

  threeComponentsIdentified: "Three components identified",
  influenceChainCreated: "Influence chain created",

  normalScenarioDescribed: "Normal scenario described",
  stressScenarioDescribed: "Stress scenario described",
  feedbackLoopIdentified: "Feedback loop identified",
  delayIdentified: "Delay identified",

  threeMetricsDefined: "Three metrics defined",
  targetValuesDefined: "Target values defined",
  twoAlternativesCompared: "Two alternatives compared",
  tradeoffIdentified: "Tradeoff identified",
  riskIdentified: "Risk identified",
  mitigationSuggested: "Mitigation suggested",
};

async function evaluateStudentMessage({ studentId, sessionId, messageText }) {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const currentLayer = session.currentLayer;

  const aiEvaluation = await evaluateLayerWithGemini({
    currentLayer,
    studentMessage: messageText,
  });

  for (const key in aiEvaluation) {
    if (aiEvaluation[key] === true) {
      const gateName = GATE_MAP[key];

      if (gateName && !session.unlockedGates.includes(gateName)) {
        session.unlockedGates.push(gateName);

        await GateEvent.create({
          studentId,
          sessionId,
          layer: currentLayer,
          gateName,
          trigger: messageText,
        });
      }
    }
  }

  const layerCompleted = isLayerCompleted(currentLayer, session.unlockedGates);

  if (layerCompleted) {
    const nextLayer = getNextLayer(currentLayer);

    if (nextLayer) {
      session.currentLayer = nextLayer;
    } else {
      session.status = "completed";
    }
  }

  await session.save();

  const progressPercent = calculateProgress(session);

  await StudentProgress.findOneAndUpdate(
    { sessionId },
    {
      currentLayer: session.currentLayer,
      progress: progressPercent,
      status: session.status === "completed" ? "completed" : "active",
      hintsUsed: session.hintsUsed,
      group: session.group,
    },
    { returnDocument: "after" }
  );

  return session;
}

function isLayerCompleted(layer, unlockedGates) {
  const requirements = {
    "Broad Context": [
      "Goal defined",
      "Three stakeholders identified",
      "Opponent identified",
      "System boundaries defined",
      "Assumption stated",
    ],

    Structure: [
      "Three components identified",
      "Influence chain created",
    ],

    Dynamics: [
      "Normal scenario described",
      "Stress scenario described",
      "Feedback loop identified",
      "Delay identified",
    ],

    Evaluation: [
      "Three metrics defined",
      "Target values defined",
      "Two alternatives compared",
      "Tradeoff identified",
      "Risk identified",
      "Mitigation suggested",
    ],
  };

  return requirements[layer].every((gate) => unlockedGates.includes(gate));
}

function getNextLayer(currentLayer) {
  const index = LAYERS.indexOf(currentLayer);
  return LAYERS[index + 1] || null;
}

function calculateProgress(session) {
  const totalGates = 17;

  if (session.status === "completed") {
    return 100;
  }

  return Math.min(
    Math.round((session.unlockedGates.length / totalGates) * 100),
    100
  );
}

module.exports = {
  evaluateStudentMessage,
};