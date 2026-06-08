async function evaluateStudentAnswer(answer) {
  return {
    goalDefined: true,
    stakeholdersIdentified: true,
    causeEffectDetected: true,
    feedbackLoopDetected: false,
    botResponse:
      "Good analysis. Now try to identify a feedback loop in the system.",
  };
}

module.exports = {
  evaluateStudentAnswer,
};