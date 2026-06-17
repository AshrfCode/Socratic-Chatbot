const { GoogleGenerativeAI } = require("@google/generative-ai");

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
}

async function generateSocraticResponse({
  studentMessage,
  lastBotQuestions,
  currentLayer,
  chatHistory,
  unlockedGates,
  progress,
  hintsUsed,
}) {
  try {
    const model = getModel();

    const historyText = chatHistory
      .slice(-10)
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    // Check if student is asking for a direct answer
    const answerSeekingPatterns = [
      "give me the answer",
      "tell me the answer",
      "solve it",
      "solution",
      "what is the answer",
      "פתרון",
      "תן לי תשובה",
      "حل",
    ];

    const wantsAnswer = answerSeekingPatterns.some((pattern) =>
      studentMessage.toLowerCase().includes(pattern.toLowerCase())
    );

    if (wantsAnswer) {
      return "What criteria would you use to evaluate a possible answer?";
    }

    const prompt = `
You are SystemThinker AI.

You are a Socratic tutor for Systems Thinking.

Rules:
- Do NOT give direct answers.
- Do NOT solve the task.
- Do NOT write final student work.
- Ask only ONE short guiding question.
- Do NOT repeat a question that already appears in the chat history.
- Respond to the student's latest message.
- Move the student forward in the current layer.
Do not repeat these previous bot questions:
${lastBotQuestions?.join("\n") || "none"}
Current layer: ${currentLayer}
Unlocked gates: ${unlockedGates?.join(", ") || "none"}
Progress: ${progress}%
Hints used: ${hintsUsed}

Recent chat:
${historyText}

Latest student message:
${studentMessage}

Ask one new Socratic question only.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text()?.trim();

    if (!text) {
      return getFallbackQuestion(currentLayer, unlockedGates);
    }

    return text;
  } catch (error) {
    console.error("Gemini real error, using fallback:", error.message);
    return getFallbackQuestion(currentLayer, unlockedGates);
  }
}

async function generateSocraticHint({ currentLayer, hintsUsed, unlockedGates }) {
  try {
    const model = getModel();

    const bloomLevel = getBloomLevel(hintsUsed);

    const prompt = `
You are SystemThinker AI.

Generate a Socratic hint using Bloom's Taxonomy.

Current layer: ${currentLayer}
Hint number: ${hintsUsed + 1}
Bloom level: ${bloomLevel}
Unlocked gates: ${unlockedGates?.join(", ") || "none"}

Rules:
- Ask only ONE open-ended question.
- Do not give the answer.
- Do not solve the task.
- Do not write the student's work.
- The hint must match the Bloom level.
- The hint must help the student think, not complete the work.

Return only the question.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text()?.trim();

    if (!text) {
      return getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates);
    }

    return text;
  } catch (error) {
    console.error("Gemini hint error, using Bloom fallback:", error.message);
    return getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates);
  }
}
function getBloomLevel(hintsUsed) {
  const levels = [
    "Remember",
    "Understand",
    "Apply",
    "Analyze",
    "Evaluate",
    "Create",
  ];

  return levels[hintsUsed] || "Create";
}

function getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates = []) {
  const bloomLevel = getBloomLevel(hintsUsed);

  const hints = {
    Remember: {
      "Broad Context": "What basic facts have you already identified about the system?",
      Structure: "Which parts or components can you name in this system?",
      Dynamics: "What events or situations happen in this system over time?",
      Evaluation: "What information do you already have for judging success?",
    },

    Understand: {
      "Broad Context": "How would you explain the purpose of this system in your own words?",
      Structure: "How are the main components connected to each other?",
      Dynamics: "How does the system behave differently in normal and stressful situations?",
      Evaluation: "How would you explain the meaning of each metric?",
    },

    Apply: {
      "Broad Context": "Can you apply your goal to a specific student learning situation?",
      Structure: "Can you apply cause and effect to connect the components?",
      Dynamics: "Can you apply the idea of feedback to your system?",
      Evaluation: "Can you apply your metrics to compare two alternatives?",
    },

    Analyze: {
      "Broad Context": "Which stakeholder has the strongest influence, and why?",
      Structure: "Which relationship between components has the strongest effect?",
      Dynamics: "Where does the most important feedback loop appear?",
      Evaluation: "What tradeoff appears when comparing the alternatives?",
    },

    Evaluate: {
      "Broad Context": "Which assumption is most risky, and how would you judge it?",
      Structure: "Which component is most critical for system success?",
      Dynamics: "Which scenario creates the greatest risk for the system?",
      Evaluation: "Which alternative is better according to your metrics?",
    },

    Create: {
      "Broad Context": "How could you refine the system boundary to make the analysis clearer?",
      Structure: "Can you create a clearer X → Y → Z influence chain?",
      Dynamics: "Can you create a feedback loop that shows how the system changes over time?",
      Evaluation: "Can you propose a mitigation plan based on your identified risk?",
    },
  };

  return (
    hints[bloomLevel]?.[currentLayer] ||
    "What is the next question that would help you think more deeply about the system?"
  );
}

async function evaluateLayerWithGemini({ currentLayer, studentMessage }) {
  try {
    const model = getModel();

    const prompt = `
You are an AI evaluation engine for a Systems Thinking learning platform.

Analyze whether the student's answer satisfies the current layer requirements.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations.

Current layer: ${currentLayer}

Student answer:
"${studentMessage}"

JSON format:
{
  "goalDefined": false,
  "threeStakeholdersIdentified": false,
  "opponentIdentified": false,
  "systemBoundariesDefined": false,
  "assumptionStated": false,
  "threeComponentsIdentified": false,
  "influenceChainCreated": false,
  "normalScenarioDescribed": false,
  "stressScenarioDescribed": false,
  "feedbackLoopIdentified": false,
  "delayIdentified": false,
  "threeMetricsDefined": false,
  "targetValuesDefined": false,
  "twoAlternativesCompared": false,
  "tradeoffIdentified": false,
  "riskIdentified": false,
  "mitigationSuggested": false
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error(
      "Gemini evaluation failed, using local fallback:",
      error.message
    );

    return evaluateLayerLocally({
      currentLayer,
      studentMessage,
    });
  }
}

function evaluateLayerLocally({ currentLayer, studentMessage }) {
  const text = studentMessage.toLowerCase();

  const result = {
    goalDefined: false,
    threeStakeholdersIdentified: false,
    opponentIdentified: false,
    systemBoundariesDefined: false,
    assumptionStated: false,
    threeComponentsIdentified: false,
    influenceChainCreated: false,
    normalScenarioDescribed: false,
    stressScenarioDescribed: false,
    feedbackLoopIdentified: false,
    delayIdentified: false,
    threeMetricsDefined: false,
    targetValuesDefined: false,
    twoAlternativesCompared: false,
    tradeoffIdentified: false,
    riskIdentified: false,
    mitigationSuggested: false,
  };

  if (currentLayer === "Broad Context") {
    result.goalDefined =
      includesAny(text, ["goal", "objective", "purpose", "מטרה", "هدف"]);

    result.threeStakeholdersIdentified =
  countMatches(text, [
    "student",
    "students",
    "teacher",
    "teachers",
    "researcher",
    "researchers",
    "librarian",
    "librarians",
    "management",
    "university management",
    "administrator",
    "administrators",
    "user",
    "users",
    "parent",
    "parents"
  ]) >= 3;

    result.opponentIdentified = includesAny(text, [
      "opponent",
      "resist",
      "resistance",
      "do not trust",
      "distrust",
      "against",
      "מתנגד",
      "معارض",
    ]);

    result.systemBoundariesDefined = includesAny(text, [
      "boundary",
      "boundaries",
      "scope",
      "inside",
      "outside",
      "only includes",
      "גבול",
      "حدود",
    ]);

    result.assumptionStated = includesAny(text, [
      "assumption",
      "assume",
      "i assume",
      "assuming",
      "הנחה",
      "افتراض",
    ]);
  }

  if (currentLayer === "Structure") {
    result.threeComponentsIdentified =
      countMatches(text, [
        "student",
        "students",
        "chatbot",
        "bot",
        "ai",
        "ai tutor",
        "dashboard",
        "teacher",
        "researcher",
        "platform",
        "component",
        "components",
        "רכיב",
        "רכיבים",
        "مكون",
        "مكونات",
      ]) >= 3;

    result.influenceChainCreated = includesAny(text, [
      "->",
      "→",
      "affects",
      "influences",
      "leads to",
      "which improves",
      "causes",
      "increase",
      "decrease",
    ]);
  }

  if (currentLayer === "Dynamics") {
    result.normalScenarioDescribed = includesAny(text, [
      "normal scenario",
      "normal",
      "regular",
      "usually",
      "every week",
      "routine",
    ]);

    result.stressScenarioDescribed = includesAny(text, [
      "stress scenario",
      "stress",
      "pressure",
      "before exams",
      "many students",
      "overload",
    ]);

    result.feedbackLoopIdentified = includesAny(text, [
      "feedback",
      "loop",
      "leads to more",
      "increases engagement",
      "more learning",
      "משוב",
      "تغذية",
    ]);

    result.delayIdentified = includesAny(text, [
      "delay",
      "after several weeks",
      "time lag",
      "later",
      "takes time",
      "עיכוב",
      "تأخير",
    ]);
  }

  if (currentLayer === "Evaluation") {
    result.threeMetricsDefined =
      countMatches(text, [
        "engagement",
        "completion",
        "score",
        "accuracy",
        "time",
        "satisfaction",
        "metric",
        "metrics",
        "מדד",
        "مقياس",
      ]) >= 3;

    result.targetValuesDefined = includesAny(text, [
      "target",
      "80",
      "90",
      "20",
      "percent",
      "%",
      "value",
    ]);

    result.twoAlternativesCompared =
      countMatches(text, [
        "alternative",
        "option",
        "ai chatbot",
        "independent learning",
        "control group",
        "experimental group",
      ]) >= 2;

    result.tradeoffIdentified = includesAny(text, [
      "tradeoff",
      "trade-off",
      "balance",
      "requires more resources",
      "cost",
    ]);

    result.riskIdentified = includesAny(text, [
      "risk",
      "depend",
      "problem",
      "challenge",
      "failure",
    ]);

    result.mitigationSuggested = includesAny(text, [
      "mitigation",
      "limit",
      "prevent",
      "reduce",
      "solution",
    ]);
  }

  return result;
}

function getFallbackQuestion(layer, unlockedGates = []) {
  const missingQuestions = {
    "Broad Context": [
      {
        gate: "Goal defined",
        question: "What is the main goal of this system in one clear sentence?",
      },
      {
        gate: "Three stakeholders identified",
        question: "Which three stakeholders are most affected by this system?",
      },
      {
        gate: "Opponent identified",
        question: "Who might resist this system, and why?",
      },
      {
        gate: "System boundaries defined",
        question: "What is inside the system boundary, and what is outside it?",
      },
      {
        gate: "Assumption stated",
        question: "What assumption are you making about how students will use the system?",
      },
    ],

    Structure: [
      {
        gate: "Three components identified",
        question: "Which three components make up this system?",
      },
      {
        gate: "Influence chain created",
        question: "How does one component influence another in a clear chain?",
      },
    ],

    Dynamics: [
      {
        gate: "Normal scenario described",
        question: "How does the system behave in a normal situation?",
      },
      {
        gate: "Stress scenario described",
        question: "How does the system behave under pressure?",
      },
      {
        gate: "Feedback loop identified",
        question: "Where could a feedback loop appear in this system?",
      },
      {
        gate: "Delay identified",
        question: "What delay might appear before the system shows improvement?",
      },
    ],

    Evaluation: [
      {
        gate: "Three metrics defined",
        question: "Which three metrics would show whether the system is successful?",
      },
      {
        gate: "Target values defined",
        question: "What target value would you set for each metric?",
      },
      {
        gate: "Two alternatives compared",
        question: "Which two alternatives should be compared?",
      },
      {
        gate: "Tradeoff identified",
        question: "What tradeoff appears between these alternatives?",
      },
      {
        gate: "Risk identified",
        question: "What risk could reduce the success of the system?",
      },
      {
        gate: "Mitigation suggested",
        question: "How could you reduce that risk without changing the system goal?",
      },
    ],
  };

  const layerQuestions = missingQuestions[layer] || [];

  const missing = layerQuestions.find(
    (item) => !unlockedGates.includes(item.gate)
  );

  if (missing) {
    return missing.question;
  }

  return "What is the next relationship or tradeoff you should examine in this system?";
}

function getFallbackHint(layer, hintsUsed, unlockedGates = []) {
  const hintNumber = hintsUsed + 1;

  if (hintNumber <= 1) {
    return getFallbackQuestion(layer, unlockedGates);
  }

  if (hintNumber === 2) {
    return "Can you make your answer more specific by naming the exact elements involved?";
  }

  if (hintNumber === 3) {
    return "Can you connect two parts of the system using cause and effect?";
  }

  return "What evidence or metric would show that your explanation is correct?";
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word.toLowerCase()));
}

function countMatches(text, words) {
  return words.filter((word) => text.includes(word.toLowerCase())).length;
}

module.exports = {
  generateSocraticResponse,
  generateSocraticHint,
  evaluateLayerWithGemini,
};