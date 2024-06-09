import mongoose from "mongoose";
const { Schema } = mongoose;

const marksModel = new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      teacherEmail: {
        type: String,
        required: true,
      },
      medium: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("marks For Grading", marksModel);