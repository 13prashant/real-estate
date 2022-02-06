const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add project's name"],
    trim: true,
  },
  builder: {
    type: mongoose.Schema.ObjectId,
    ref: "Builder",
    required: true,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  details: [
    {
      bedrooms: {
        type: Number,
        required: [true, "Please add number of bedrooms"],
      },
      price: {
        type: Number,
      },
      area: {
        type: Number,
      },
      sold: [
        {
          customer: {
            type: mongoose.Schema.ObjectId,
            ref: "Customer",
          },
          broker: {
            type: mongoose.Schema.ObjectId,
            ref: "Broker",
          },
        },
      ],
    },
  ],
  photos: [
    {
      type: String,
      default: "no-photo.jpg",
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
