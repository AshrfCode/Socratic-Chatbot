const express = require("express");

const {
  startSession,
  getSession,
  increaseHint,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/start", startSession);

router.get("/:sessionId", getSession);

router.post("/increase-hint", increaseHint);

router.post("/assign-group", (req, res) => {
  res.status(400).json({
    message:
      "Group assignment is automatic when starting a session. Students cannot choose their group manually.",
  });
});

module.exports = router;