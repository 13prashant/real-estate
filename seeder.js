const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load config vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Builder = require("./models/Builder");
const Project = require("./models/Project");
const Customer = require("./models/Customer");
const Broker = require("./models/Broker");

// Connect to db
mongoose.connect(process.env.MONGO_URI);

// Read json files
const builders = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/builders.json`, "utf-8")
);

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/projects.json`, "utf-8")
);

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, "utf-8")
);

const brokers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/brokers.json`, "utf-8")
);

// Import to db
const importData = async () => {
  try {
    await Customer.create(customers);
    await Broker.create(brokers);
    await Project.create(projects);
    await Builder.create(builders);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await Builder.deleteMany();
    await Project.deleteMany();
    await Customer.deleteMany();
    await Broker.deleteMany();
    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
