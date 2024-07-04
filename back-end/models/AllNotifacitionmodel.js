import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AllNotifacitionSchema = new Schema(
  {
    UseEmail: {
      type: String,
    },
    jobrole: {
      type: String,
      required: true,
    },
    postedemail: {
      type: String,
      required: true,
    },
    TeacheSubject: {
      type: String,
      required: true,
    },
    mediua: {
      type: String,
      required: true,
    },
    Announcementmessage: {
      type: String,
      required: true,
    },
    titleofAnn: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    view: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AllNotifacition", AllNotifacitionSchema);
