const mongoose = require("mongoose");

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

module.exports = mongoose.model("Builder", BuilderSchema);
