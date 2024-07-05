import mongoose from "mongoose";
const { Schema } = mongoose;

const announcementSchemaNC = new Schema(
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
      default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    },
    viewedBy: {
      type: [String], // List of user emails who have viewed the announcement
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const AnnouncementNC = mongoose.model("AnnouncementNEC", announcementSchemaNC);
export default AnnouncementNC;
