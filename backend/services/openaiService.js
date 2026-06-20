const { OpenAI } = require("openai");

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in .env file");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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
    const openai = getClient();

    const historyText = chatHistory
      .slice(-10)
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    const answerSeekingPatterns = [
      "give me the answer", "tell me the answer", "solve it", "solution",
      "what is the answer", "פתרון", "תן לי תשובה", "איך פותרים", "حل"
    ];

    const wantsAnswer = answerSeekingPatterns.some((pattern) =>
      studentMessage.toLowerCase().includes(pattern.toLowerCase())
    );

    if (wantsAnswer) {
      return "אני כאן כדי לעזור לך לחשוב על זה בעצמך. אילו קריטריונים היית בוחן כדי למצוא פתרון?";
    }

    const systemPrompt = `
You are SystemThinker AI, a highly advanced Socratic tutor for Systems Thinking.

BACKGROUND STORY (The Case Study):
"גלידרייה שכונתית קטנה ואהובה עם מתכון סודי שעובר במשך שלושה דורות. 
אנשים מגיעים ממרחקים במיוחד כדי לטעום את הגלידה, מה שיוצר תורים ענקיים בשעות העומס. 
המשימה: פתרון בעיית התורים תוך שמירה על איכות, מסורת ושביעות הרצון של כולם."

SYSTEMS THINKING PRINCIPLES TO ENFORCE:
1. Understanding the system as a whole and seeing the big picture.
2. Defining system boundaries (especially non-engineering/social factors like tradition, neighborhood impact, customer feelings).
3. Understanding the implications and unintended consequences of proposed changes.

RULES FOR YOUR RESPONSE:
- Communicate in the same language the student uses (If they type Hebrew, reply in Hebrew).
- Do NOT give direct answers or solve the problem for them.
- Ask only ONE short, guiding open-ended question.
- Do NOT repeat questions that already appear in the chat history.
- Move the student forward towards unlocking the next requirement in the current layer.

Do not repeat these previous bot questions:
${lastBotQuestions?.join("\n") || "none"}

Current layer: ${currentLayer}
Unlocked gates: ${unlockedGates?.join(", ") || "none"}
Progress: ${progress}%
Hints used: ${hintsUsed}

Recent chat:
${historyText}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // You can change this to gpt-4o-mini to save costs!
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: studentMessage }
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content?.trim();

    if (!text) {
      return getFallbackQuestion(currentLayer, unlockedGates);
    }

    return text;
  } catch (error) {
    console.error("OpenAI real error, using fallback:", error.message);
    return getFallbackQuestion(currentLayer, unlockedGates);
  }
}

async function generateSocraticHint({ currentLayer, hintsUsed, unlockedGates }) {
  try {
    const openai = getClient();
    const bloomLevel = getBloomLevel(hintsUsed);

    const systemPrompt = `
You are SystemThinker AI tutoring a student on an Ice Cream Shop case study.
Generate a Socratic hint using Bloom's Taxonomy.

Current layer: ${currentLayer}
Hint number: ${hintsUsed + 1}
Bloom level: ${bloomLevel}
Unlocked gates: ${unlockedGates?.join(", ") || "none"}

Rules:
- Ask only ONE open-ended question.
- Do not give the answer.
- Do not solve the task.
- The hint must match the Bloom level.
Return only the question.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content?.trim();

    if (!text) {
      return getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates);
    }

    return text;
  } catch (error) {
    console.error("OpenAI hint error, using Bloom fallback:", error.message);
    return getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates);
  }
}

function getBloomLevel(hintsUsed) {
  const levels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
  return levels[hintsUsed] || "Create";
}

function getBloomFallbackHint(currentLayer, hintsUsed, unlockedGates = []) {
  const bloomLevel = getBloomLevel(hintsUsed);

  const hints = {
    Remember: {
      "Broad Context": "What basic facts have you already identified about the ice cream shop?",
      Structure: "Which parts or components can you name in this shop's system?",
      Dynamics: "What events or situations happen in the shop over time?",
      Evaluation: "What information do you already have for judging if a solution works?",
    },
    Understand: {
      "Broad Context": "How would you explain the core problem of the shop in your own words?",
      Structure: "How are the main components (like customers and staff) connected?",
      Dynamics: "How does the shop behave differently in normal times vs rush hour?",
      Evaluation: "How would you explain the meaning of each success metric?",
    },
    Apply: {
      "Broad Context": "Can you apply your goal to a specific customer's experience?",
      Structure: "Can you apply cause and effect to connect the shop's components?",
      Dynamics: "Can you apply the idea of feedback to the long lines?",
      Evaluation: "Can you apply your metrics to compare two possible solutions?",
    },
    Analyze: {
      "Broad Context": "Which stakeholder has the strongest influence on the shop's tradition, and why?",
      Structure: "Which relationship between components causes the biggest bottleneck?",
      Dynamics: "Where does the most important feedback loop appear during busy hours?",
      Evaluation: "What tradeoff appears when comparing the alternatives?",
    },
    Evaluate: {
      "Broad Context": "Which assumption about the customers is most risky?",
      Structure: "Which component is most critical for keeping the lines moving?",
      Dynamics: "Which scenario creates the greatest risk for the shop's reputation?",
      Evaluation: "Which alternative is better for keeping both tradition and speed?",
    },
    Create: {
      "Broad Context": "How could you refine the system boundary to include the neighborhood?",
      Structure: "Can you create a clearer X → Y → Z influence chain for the ordering process?",
      Dynamics: "Can you create a feedback loop that shows how wait times affect customer return rate?",
      Evaluation: "Can you propose a mitigation plan based on the risk of losing the secret recipe's quality?",
    },
  };

  return hints[bloomLevel]?.[currentLayer] || "What is the next question that would help you think more deeply about the system?";
}

// NOTE: Renamed this function for clarity since we are using OpenAI now
async function evaluateLayerWithOpenAI({ currentLayer, studentMessage }) {
  try {
    const openai = getClient();

    const systemPrompt = `
You are an AI evaluation engine for a Systems Thinking learning platform.
Analyze whether the student's answer satisfies the current layer requirements for the Ice Cream Shop case study.

Return ONLY valid JSON. 

Current layer: ${currentLayer}

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" }, // OpenAI's strict JSON mode!
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Student answer: "${studentMessage}"` }
      ],
      temperature: 0.1, // Low temperature for consistent JSON
    });

    const text = response.choices[0].message.content?.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("OpenAI evaluation failed, using local fallback:", error.message);
    return evaluateLayerLocally({ currentLayer, studentMessage });
  }
}

function evaluateLayerLocally({ currentLayer, studentMessage }) {
  const text = studentMessage.toLowerCase();

  const result = {
    goalDefined: false, threeStakeholdersIdentified: false, opponentIdentified: false,
    systemBoundariesDefined: false, assumptionStated: false, threeComponentsIdentified: false,
    influenceChainCreated: false, normalScenarioDescribed: false, stressScenarioDescribed: false,
    feedbackLoopIdentified: false, delayIdentified: false, threeMetricsDefined: false,
    targetValuesDefined: false, twoAlternativesCompared: false, tradeoffIdentified: false,
    riskIdentified: false, mitigationSuggested: false,
  };

  if (currentLayer === "Broad Context") {
    result.goalDefined = includesAny(text, ["goal", "objective", "purpose", "מטרה", "יעד", "לפתור", "להקטין"]);
    result.threeStakeholdersIdentified = countMatches(text, [
      "לקוח", "לקוחות", "קונים", "בעלים", "הנהלה", "מנהל", "עובד", "עובדים", "מוכרים", "צוות",
      "שכנים", "שכונה", "תושבים", "ספק", "ספקים", "customer", "owner", "worker", "employee", "neighbor"
    ]) >= 3;
    result.opponentIdentified = includesAny(text, ["opponent", "resist", "resistance", "מתנגד", "התנגדות", "לקוחות ותיקים", "דורות", "מסורת", "שמרנים"]);
    result.systemBoundariesDefined = includesAny(text, ["boundary", "boundaries", "scope", "inside", "outside", "גבול", "גבולות", "מחוץ", "בתוך", "רק את", "כולל את"]);
    result.assumptionStated = includesAny(text, ["assumption", "assume", "הנחה", "מניח", "בהנחה ש", "افتراض"]);
  }

  if (currentLayer === "Structure") {
    result.threeComponentsIdentified = countMatches(text, [
      "לקוח", "לקוחות", "גלידה", "תור", "קופה", "מוכר", "צוות", "מתכון", "מקום", "מרחב", "שכנים", "מכונה", "component", "components", "רכיב", "רכיבים"
    ]) >= 3;
    result.influenceChainCreated = includesAny(text, ["->", "→", "affects", "influences", "leads to", "causes", "increase", "decrease", "גורם ל", "מוביל ל", "משפיע על"]);
  }

  if (currentLayer === "Dynamics") {
    result.normalScenarioDescribed = includesAny(text, ["normal scenario", "normal", "regular", "usually", "routine", "רגיל", "בדרך כלל", "שגרה"]);
    result.stressScenarioDescribed = includesAny(text, ["stress", "pressure", "overload", "עומס", "לחץ", "תור ארוך", "שעות השיא"]);
    result.feedbackLoopIdentified = includesAny(text, ["feedback", "loop", "leads to more", "משוב", "מעגל", "מביא עוד", "تغذية"]);
    result.delayIdentified = includesAny(text, ["delay", "later", "takes time", "עיכוב", "לוקח זמן", "זמן המתנה", "תור", "تأخير"]);
  }

  if (currentLayer === "Evaluation") {
    result.threeMetricsDefined = countMatches(text, ["engagement", "completion", "score", "time", "satisfaction", "metric", "מדד", "זמן", "כסף", "רווח", "איכות", "שביעות רצון"]) >= 3;
    result.targetValuesDefined = includesAny(text, ["target", "80", "90", "20", "10", "percent", "%", "value", "דקות", "אחוזים"]);
    result.twoAlternativesCompared = countMatches(text, ["alternative", "option", "חלופה", "אופציה", "אפשרות", "פתרון א", "פתרון ב"]) >= 2;
    result.tradeoffIdentified = includesAny(text, ["tradeoff", "trade-off", "balance", "cost", "פשרה", "ויתור", "מחיר", "עלות"]);
    result.riskIdentified = includesAny(text, ["risk", "depend", "problem", "challenge", "failure", "סיכון", "בעיה", "סכנה", "פגיעה"]);
    result.mitigationSuggested = includesAny(text, ["mitigation", "limit", "prevent", "reduce", "solution", "למנוע", "להפחית", "לצמצם", "פתרון"]);
  }

  return result;
}

function getFallbackQuestion(layer, unlockedGates = []) {
  const missingQuestions = {
    "Broad Context": [
      { gate: "Goal defined", question: "מהי המטרה המרכזית של הגלידרייה במשפט אחד ברור?" },
      { gate: "Three stakeholders identified", question: "אילו שלושה גורמים מרכזיים מושפעים מהתורים בגלידרייה?" },
      { gate: "Opponent identified", question: "מי עשוי להתנגד לשינויים במסורת של הגלידרייה, ומדוע?" },
      { gate: "System boundaries defined", question: "היכן עובר הגבול בין מה שקורה בתוך הגלידרייה למה שקורה בשכונה?" },
      { gate: "Assumption stated", question: "איזו הנחה אתה מניח לגבי התנהגות הלקוחות בזמן שהם ממתינים?" },
    ],
    Structure: [
      { gate: "Three components identified", question: "אילו שלושה רכיבים מרכזיים מרכיבים את המערכת של הגלידרייה?" },
      { gate: "Influence chain created", question: "כיצד רכיב אחד (למשל, אורך התור) משפיע על רכיב אחר בשרשרת ברורה?" },
    ],
    Dynamics: [
      { gate: "Normal scenario described", question: "כיצד המערכת מתנהגת ביום רגיל ושקט?" },
      { gate: "Stress scenario described", question: "כיצד המערכת מתנהגת בשעות השיא או תחת לחץ?" },
      { gate: "Feedback loop identified", question: "היכן עשויה להיווצר לולאת משוב (למשל, תור ארוך גורם לאנשים לעזוב, מה שמקצר את התור)?" },
      { gate: "Delay identified", question: "איזה עיכוב קיים בין ביצוע ההזמנה לבין קבלת הגלידה?" },
    ],
    Evaluation: [
      { gate: "Three metrics defined", question: "אילו שלושה מדדים יראו האם הפתרון שתציע הוא מוצלח?" },
      { gate: "Target values defined", question: "איזה ערך יעד היית מציב לכל מדד (למשל, זמן המתנה מקסימלי)?" },
      { gate: "Two alternatives compared", question: "אילו שתי חלופות או פתרונות אפשר להשוות?" },
      { gate: "Tradeoff identified", question: "איזו פשרה קיימת בין שמירה על המסורת לבין קיצור התור?" },
      { gate: "Risk identified", question: "איזה סיכון עלול לפגוע בהצלחת הפתרון שלך?" },
      { gate: "Mitigation suggested", question: "כיצד תוכל להפחית את הסיכון הזה מבלי לפגוע באיכות הגלידה?" },
    ],
  };

  const layerQuestions = missingQuestions[layer] || [];
  const missing = layerQuestions.find((item) => !unlockedGates.includes(item.gate));
  return missing ? missing.question : "מהו הקשר הבא שחשוב לבחון במערכת הזו?";
}

function getFallbackHint(layer, hintsUsed, unlockedGates = []) {
  const hintNumber = hintsUsed + 1;
  if (hintNumber <= 1) return getFallbackQuestion(layer, unlockedGates);
  if (hintNumber === 2) return "האם תוכל למקד את התשובה שלך ולציין את הגורמים הספציפיים המעורבים?";
  if (hintNumber === 3) return "האם תוכל לקשר בין שני חלקים במערכת באמצעות סיבה ותוצאה?";
  return "איזה נתון או מדד יראה שההסבר שלך נכון?";
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
  evaluateLayerWithOpenAI, // NOTE: Export name changed here!
};