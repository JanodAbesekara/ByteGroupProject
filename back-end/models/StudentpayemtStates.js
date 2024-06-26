import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentpaymentStatesSchema = new Schema(
  {
    stuemail: {
      type: String,
      required: true,
    },
    TeacherEmail: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    Bankname: {
      type: String,
      required: true,
    },
    AccountNum: {
      type: String,
      required: true,
    },
    photourl: {
      type: String,
      required: true,
    },
    createdAt: { 
      type: Date, 
      default: Date.now,
      index: { expires: '20d' } // TTL index to expire documents after 20 days
    }
  },
  {
    timestamps: true,
  }
);

// Ensure that the TTL index is created
StudentpaymentStatesSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 * 24 * 60 * 60 });

export default mongoose.model(
  "StudentpaymentStates",
  StudentpaymentStatesSchema
);
