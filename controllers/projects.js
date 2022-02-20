const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  const projects = await Project.find().populate({ path: "builder" });
  res
    .status(200)
    .json({ success: true, count: projects.length, data: projects });
};
