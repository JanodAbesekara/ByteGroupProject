import mongoose from "mongoose";
import cron from "node-cron";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Lecturer", "Student"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailverficatonToken: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
cron.schedule("0 0 * * *", async () => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await User.deleteMany({ verified: false, createdAt: { $lt: oneDayAgo } });
  console.log("Deleted unverified users older than 1 day");
});
