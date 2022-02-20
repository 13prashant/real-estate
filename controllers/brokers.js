const Broker = require("../models/Broker");

// @desc    Get all brokers
// @route   GET /api/v1/brokers
// @access  Public
module.exports.getBrokers = async (req, res, next) => {
  const brokers = await Broker.find();

  res.status(200).json({ success: true, count: brokers.length, data: brokers });
};
