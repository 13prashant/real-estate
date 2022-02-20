const express = require("express");
const { getBuilders } = require("../controllers/builders");

const router = express.Router();

router.route("/").get(getBuilders);

module.exports = router;
