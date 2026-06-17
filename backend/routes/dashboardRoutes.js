const express = require("express");

const {
  getDashboardData,
  getResearchAnalytics,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", getDashboardData);
router.get("/analytics", getResearchAnalytics);

module.exports = router;