//package
import mongoose from "mongoose";

//create book scheam
const bookScheam = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
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

//export book schema
export default mongoose.model("Book", bookScheam);
