async function researcherLogin(req, res) {
  try {
    const { username, accessCode } = req.body;

    if (
      username !== process.env.RESEARCHER_USERNAME ||
      accessCode !== process.env.RESEARCHER_ACCESS_CODE
    ) {
      return res.status(401).json({
        message: "Invalid researcher credentials",
      });
    }

    res.json({
      role: "researcher",
      researcherName: username,
      isResearcher: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Researcher login failed",
      error: error.message,
    });
  }
}

module.exports = {
  researcherLogin,
};