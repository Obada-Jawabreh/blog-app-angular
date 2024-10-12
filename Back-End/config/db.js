require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI; 

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
