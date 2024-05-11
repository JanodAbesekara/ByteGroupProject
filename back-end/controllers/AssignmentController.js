import Assignment from "../models/assignmentmodel.js";

const createAssignmentController = async (req, res) => {
  const { TeacherEmail, TeacherSubject, question, TimeRanges ,submedium} =
    req.body;

  try {
    if (
      !TeacherEmail ||
      !TeacherSubject ||
      !question ||
      !TimeRanges ||
      !submedium
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (question.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one question is required" });
    }
    if (question.length > 30 && question.length < 1) {
      return res
        .status(400)
        .json({
          message: "Maximum 30 questions are allowed and Minimun length 1",
        });
    }


    const newAssignment = new Assignment({
      TeacherEmail,
      TeacherSubject,
      question,
      TimeRanges,
      submedium,
    });

    await newAssignment.save();
    return res
      .status(201)
      .json({ message: "Assignment created successfully", quiz: newAssignment });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAssignmentController = async (req, res) => {
  try {
    const assignment = await Assignment.find();
    res.status(200).json(assignment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export { createAssignmentController , getAssignmentController };
