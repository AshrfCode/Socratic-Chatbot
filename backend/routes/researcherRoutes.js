const express = require("express");
const { researcherLogin } = require("../controllers/researcherController");

const router = express.Router();

router.post("/login", researcherLogin);

module.exports = router;