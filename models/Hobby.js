//package
import mongoose from "mongoose";

//create hobby schema
const hobbySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
//export hobby schema
export default mongoose.model("Hobby", hobbySchema);
