import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timeStamp: String,
  received: Boolean,
});

export default mongoose.model("messages", chatSchema);
