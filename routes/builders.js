const express = require("express");
const { getBuilders, getBuilder } = require("../controllers/builders");

const router = express.Router();

router.route("/").get(getBuilders);

router.route("/:id").get(getBuilder);

module.exports = router;
