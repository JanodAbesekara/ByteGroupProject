import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageN = mongoose.model("MessageN", messageSchema);
export default MessageN;