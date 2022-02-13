const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your surname"],
  },
  fullName: String,
  mobile: {
    type: String,
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

CustomerSchema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("Customer", CustomerSchema);
