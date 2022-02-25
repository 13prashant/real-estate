const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add project's name"],
    trim: true,
  },
  builder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mobile: {
    type: String,
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
      type: {
        type: String,
        enum: ["Flat", "Row House"],
        required: [true, "Please select type of project"],
      },
      bhk: {
        type: Number,
        required: [true, "Please add number of bedrooms"],
      },
      price: {
        type: Number,
      },
      superArea: {
        type: Number,
      },
      carpetArea: {
        type: Number,
      },
      parking: {
        cars: {
          type: Number,
        },
        bikes: {
          type: Number,
        },
      },
      sold: [
        {
          customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          broker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
