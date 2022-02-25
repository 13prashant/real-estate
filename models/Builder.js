const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const BuilderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add builder's name"],
    trim: true,
  },
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
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project",
  },
});

// Encrypt password usning bcryptjs
BuilderSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

// Sign jwt and return
BuilderSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Builder", BuilderSchema);
