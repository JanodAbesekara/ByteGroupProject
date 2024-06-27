import Assignment from "../models/Assignmentmodel.js";
import GradesModel from "../models/marksModel.js";
import userProfileModel from "../models/userProfileModel.js";
import Enrollment from "../models/Enrollmentmdels.js";
import studentProfileModel from "../models/studentProfileModel.js";

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
    const { email, subject, score, teacherEmail, medium, name, status } =
      req.body;

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
      grade,
      name,
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
        name,
        status,
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

const getStudentGrades = async (req, res) => {
  const teacherEmail = req.query.email;
  const subject = req.query.subject;
  const medium = req.query.medium;
  try {
    const studentGrades = await GradesModel.find({
      teacherEmail: teacherEmail,
      subject: subject,
      medium: medium,
    });
    return res.json(studentGrades);
  } catch (error) {
    return res.json({ msg: "An error occured" });
  }
};

const checkAvailability = async (req, res) => {
  const { email, teacherEmail, medium, subject } = req.query;

  try {
    const fetchedDetails = await GradesModel.findOne({
      email: email,
      subject: subject,
      teacherEmail: teacherEmail,
      medium: medium,
    });
    if (fetchedDetails) {
      return res.status(200).json({ success: true, data: fetchedDetails });
    } else {
      return res.status(200).json({
        success: false,
        msg: "Requested data is not available in the server",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "Unexpected error occured",
    });
  }
};

const getgradefromteacher = async (req, res) => {
  try {
    const { email } = req.query;

    const subjects = await userProfileModel.find({ email: email });
    // return res.status(200).json({ success: true, data: subjects });

    // find the data email subject medium trrrow

    const geteachdataset = subjects.map((subject) => ({
      subject: subject.subject,
      medium: subject.medium,
      email: subject.email,
    }));

    const gradeget = await GradesModel.find({
      $or: geteachdataset.map((sub) => ({
        teacherEmail: sub.email,
        medium: sub.medium,
        subject: sub.subject,
      })),
    });

    return res.status(200).json({ success: true, data: gradeget });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const subjectvicestudents = async (req, res) => {
  try {
    const { email } = req.query;

    const enroledstu = await Enrollment.find({ teacherEmail: email });

    const geteachdataset = enroledstu.map((subject) => ({
      email: subject.userEmail,
    }));

    const gradeget = await studentProfileModel.find({
      $or: geteachdataset.map((sub) => ({
        uEmail: sub.email,
      })),
    });

    return res.status(200).json({ success: true, data: gradeget });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export {
  createAssignmentController,
  getAssignmentController,
  gradeController,
  deleteAssignmentController,
  getGrades,
  getStudentGrades,
  checkAvailability,
  getgradefromteacher,
  subjectvicestudents,
};
