import mongoose from 'mongoose';
const{Schema} = mongoose;

const Assignmentschema = new Schema({
    TeacherEmail:{
        type: String,
        required: true
    },
    TeacherSubject:{
        type: String,
        required: true
    },
    submedium:{
        type: String,
        required: true
    },
    question: [
        {
            Question: {
                type: String,
                required: true
            },
            answers: {
                type: [String],
                required: true
            },
            correctAnswerIndex: {
                type: Number,
                required: true
            }
        }
    ],
    TimeRanges:{
        type:Number,
        required: true
    },
    
});

const Assignment = mongoose.model('Assignment', Assignmentschema);
export default Assignment;