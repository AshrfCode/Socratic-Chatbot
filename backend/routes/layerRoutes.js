const express = require("express");

const {
  getLayers,
  checkLayer,
} = require("../controllers/layerController");

const router = express.Router();

router.get("/", getLayers);

router.post("/check", checkLayer);

module.exports = router;