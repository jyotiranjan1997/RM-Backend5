const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connect to DB");
  } catch (err) {
    console.log("connect Failed to DB");
  }
};


module.exports={connect}