import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    messages: [
      {
        senderID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversition = mongoose.model("Conversition", messageSchema);
export default Conversition;