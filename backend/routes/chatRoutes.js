const express = require("express");

const {
  getChatMessages,
  sendMessage,
  getHint,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/:chatId", getChatMessages);
router.post("/:chatId/message", sendMessage);
router.post("/:chatId/hint", getHint);

module.exports = router;