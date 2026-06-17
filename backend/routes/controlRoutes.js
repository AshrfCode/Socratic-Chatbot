const express = require("express");

const { saveControlLog } = require("../controllers/controlController");

const router = express.Router();

router.post("/log", saveControlLog);

module.exports = router;