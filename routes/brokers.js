const express = require("express");
const { getBrokers } = require("../controllers/brokers");

const router = express.Router();

router.route("/").get(getBrokers);

module.exports = router;
