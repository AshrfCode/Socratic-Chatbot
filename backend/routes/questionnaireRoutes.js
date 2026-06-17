const express = require("express");

const {
  submitPreTask,
  submitPostTask,
} = require("../controllers/questionnaireController");

const router = express.Router();

router.post("/pre-task", submitPreTask);
router.post("/post-task", submitPostTask);

module.exports = router;