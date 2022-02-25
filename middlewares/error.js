const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err, err.name, err.code);

  if (err.name === "CastError") {
    const message = `Resource is not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
