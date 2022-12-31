import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide Number"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userModel);
