import Assignmentschema from '../models/Assignmentmodel.js';

const assignmentadd = async (req, res) => {
   
    const { TeacherEmail, TeacherSubject, submedium, question, TimeRanges } = req.body;

    if(!TeacherEmail || !TeacherSubject || !submedium || !question || !TimeRanges){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const oldassignmet = await Assignmentschema.findOne({TeacherEmail, TeacherSubject, submedium, question, TimeRanges});

    if(oldassignmet){
        return res.status(400).json({success: false, message: "Assignment already exists"});
    }

    try {
        const newAssignment = new Assignmentschema({
            TeacherEmail,
            TeacherSubject,
            submedium,
            question,
            TimeRanges
        });
        await newAssignment.save();
        res.status(201).json({success: true, message: "Assignment created successfully"});
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }

};

export default assignmentadd;