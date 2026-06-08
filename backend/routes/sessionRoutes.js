const express = require("express");
const {
  getSession,
  increaseHint,
  moveToNextLayer,
} = require("../controllers/sessionController");

const router = express.Router();

router.get("/", getSession);
router.post("/hint", increaseHint);
router.post("/next-layer", moveToNextLayer);

module.exports = router;