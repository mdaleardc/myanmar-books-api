const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;

const connectDB = async () => {
  try {
  await mongoose.connect(uri);
  console.log("Database is connected successfully.");
  } catch (err) {
    console.error("Somethig went wrong to connect database!");
  }
}

module.exports = connectDB;