import { mongoose} from 'mongoose';

const {Schema} = mongoose;

const stProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      mobileNo: {
        type: String,
        required: true,
      },
      id: {
        type: String, 
      },
},
  {
    timestamps: true,
  });

  export default mongoose.model("studentsGuardian", stProfileSchema);
      