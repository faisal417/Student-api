//package
import mongoose from "mongoose";

//mongoDB connection
export const mongoDBConnection = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected successfully`.bgYellow.black);
  } catch (error) {
    console.log(`mongoDB connection failed!`.bgRed.black);
  }
};
