const express = require("express");
const {
  getChatMessages,
  addChatMessage,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/:chatId", getChatMessages);
router.post("/", addChatMessage);

module.exports = router;