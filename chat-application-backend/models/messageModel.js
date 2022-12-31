import mongoose from "mongoose";

const channelModel = mongoose.Schema(
  {
    channelUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        name: { type: String, default: "" },
        profilePic: { type: String, default: "" },
      },
    ],
    messages: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        messageType: { type: String, default: "TEXT" },
        text: { type: String, default: "" },
        addedOn: { type: Number, default: Date.now() },
      },
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("channel", channelModel);
