import Assignment from "../models/Assignmentmodel.js";
import GradesModel from "../models/marksModel.js";

const createAssignmentController = async (req, res) => {
  const { TeacherEmail, TeacherSubject, question, TimeRanges, submedium } =
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
      return res.status(400).json({
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
    return res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
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

const deleteAssignmentController = async (req, res) => {
  const id = req.params.id;
  try {
    await Assignment.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, msg: "Assignment deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "error deleting assignment" });
  }
};

const gradeController = async (req, res) => {
  try {
    const { email, subject, score, teacherEmail, medium } = req.body;

    let grade;
    // Determine grade based on score
    if (score > 75) {
      grade = "A";
    } else if (score > 65 && score <= 75) {
      grade = "B";
    } else if (score > 55 && score <= 65) {
      grade = "C";
    } else if (score > 45 && score <= 55) {
      grade = "D";
    } else {
      grade = "W";
    }

    // Check if an entry with the same email, subject, teacherEmail, and medium already exists
    const existingMarks = await GradesModel.findOne({
      email,
      subject,
      teacherEmail,
      medium,
    });

    if (existingMarks) {
      // Update the existing record
      existingMarks.score = score;
      existingMarks.grade = grade;
      await existingMarks.save();
      return res.status(200).json({ msg: "Marks updated successfully" });
    } else {
      // Create and save new marks
      const newMarks = new GradesModel({
        email,
        subject,
        score,
        teacherEmail,
        medium,
        grade,
      });

      await newMarks.save();
      return res.status(200).json({ msg: "Marks saved successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Marks saving failed", error: error.message });
  }
};

const getGrades = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const grades = await GradesModel.find({ email: userEmail });
    return res.json(grades);
  } catch (error) {
    return res.json("No Grades found");
  }
};

export {
  createAssignmentController,
  getAssignmentController,
  gradeController,
  deleteAssignmentController,
  getGrades,
};
