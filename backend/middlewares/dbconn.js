const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //DATABASE CONNECTION
    const DB = process.env.DATABASE.replace(
      "<DB_PASSWORD>",
      process.env.DB_PASSWORD
    );
    const conn = await mongoose.connect(DB, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
