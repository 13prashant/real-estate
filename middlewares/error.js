// const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // Log to console for dev
  console.log(err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "server error",
  });
};

module.exports = errorHandler;
