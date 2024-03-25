import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
    },
    experience: {
      type: String,
      required: true,
    },
    aboutme: {
      type: String,
      required: true,
    },

    email: {
        type:String,
    },
    profilePicUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("profile", profileSchema);
