import mongoose from "mongoose";

import dotenv from "dotenv"
// const MONGO_URL= 
dotenv.config()

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DBCONECTION!);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    process.exit(1);
  }
};

export default dbconnect;
