const asyncHandler = require("express-async-handler");
const Builder = require("../models/Builder");

// @desc    Get all builders
// @route   GET /api/v1/builders
// @access  Public
exports.getBuilders = asyncHandler(async (req, res, next) => {
  const builders = await Builder.find().populate({
    path: "projects",
    select: ["name"],
  });

  res
    .status(200)
    .json({ success: true, count: builders.length, data: builders });
});
