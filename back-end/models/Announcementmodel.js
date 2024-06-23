import mongoose from "mongoose";
const { Schema } = mongoose;

const announcementSchema = new Schema(
  {
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
      default: function () {
        return this.jobrole === "Admin" ? "System change" : "";
      },
    },
    mediua: {
      type: String,
      default: function () {
        return this.jobrole === "Admin" ? "System" : "";
      },
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
    time: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    }
  },
  {
    timestamps: true,
  }
);


// Create TTL index on expiresAt field to automatically delete documents after 5 days
announcementSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 5 * 24 * 60 * 60 * 1000 });

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
