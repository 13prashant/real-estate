const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
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

// @desc    Get single builder
// @route   GET /api/v1/builders/:ids
// @access  Public
exports.getBuilder = asyncHandler(async (req, res, next) => {
  const builder = await Builder.findById(req.params.id).populate({
    path: "projects",
    select: ["name"],
  });

  if (!builder) {
    return next(
      new ErrorResponse(`Builder not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: builder });
});

// @desc    Create builder
// @route   POST /api/v1/builders/
// @access  Public
exports.createBuilder = asyncHandler(async (req, res, next) => {
  const { name, mobile, email, password, projects } = req.body;

  // Create builder
  const builder = await Builder.create({
    name,
    mobile,
    email,
    password,
    projects,
  });

  builder.save({ validationBeforeSave: false });

  sendTokenResponse(builder, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
