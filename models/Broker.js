const mongoose = require("mongoose");

const BrokerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your surname"],
  },
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false,
  },
});

BrokerSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("Broker", BrokerSchema);
