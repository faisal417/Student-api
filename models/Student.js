//package
import mongoose from "mongoose";

//create schema
const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      max: 30,
      ming: 15,
    },
    depertment: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    books: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
      default: [],
    },
    hobby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hobby",
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//export student schema
export default mongoose.model("Student", studentSchema);
