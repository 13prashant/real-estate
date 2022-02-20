const express = require("express");
const { getProjects } = require("../controllers/projects");

const router = express.Router();

router.route("/").get(getProjects);

module.exports = router;
