import mongoose from "mongoose";

const{Schema} = mongoose;

const attendennceSchema = new Schema({

    studentnemail:{
        type: String,
        required: true
    },
    studentname:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    isPresent: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
   },
    {
        timestamps: true
    }
    

);

export default mongoose.model("studentAttendes", attendennceSchema);