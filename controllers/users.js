const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
module.exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
};

// @desc    Get all builders
// @route   GET /api/v1/users/builders
// @access  Public
module.exports.getBuilders = async (req, res, next) => {
  const builders = await User.find({ role: "builder" });
  res
    .status(200)
    .json({ success: true, count: builders.length, data: builders });
};
