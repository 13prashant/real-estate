const Customer = require("../models/Customer");
// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Public
module.exports.getCustomers = async (req, res, next) => {
  const customers = await Customer.find();
  res
    .status(200)
    .json({ success: true, count: customers.length, data: customers });
};
