import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherlecture = new Schema(
  {
    teacheremail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    time:{
      type: Number,
      required: true,
    },
    leccount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("teacherlecturecount", teacherlecture);
