import usermodel from "../models/usermodel.js";
import profile from "../models/userProfileModel.js";
import Announcement from "../models/Announcementmodel.js";
import Getfeedbacksmodel from "../models/Getfeedbacksmodel.js";
import Lecturematerial from "../models/Lecturematerial.js";
import Assignment from "../models/Assignmentmodel.js";
import postmodels from "../models/Postmodels.js";
import quisemodel from "../models/Quizzesmodels.js";
import teacherlecturecount from "../models/TeacherLecturecountmodel.js";
import Enrollment from "../models/Enrollmentmdels.js";
import studentprofile from "../models/studentProfileModel.js";
import paymentmodel from "../models/paymentModel.js";
import studentAttendence from "../models/studentAttendesmodel.js";
import StudentpayemtStates from "../models/StudentpayemtStates.js";
import marksModel from "../models/marksModel.js";

const studentdetails = async (req, res) => {
  try {
    const students = await usermodel.find({ role: "Student", verified: true });

    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error during student details:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const removeStudent = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    await usermodel.deleteOne({ email: email });
    await Enrollment.delete({ userEmail: email });
    await studentprofile.delete({ email: email });
    return res
      .status(200)
      .json({ success: true, msg: "Student deleted successfully" });
  } catch (error) {
    console.error("Error during student deletion:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const teacherdetails = async (req, res) => {
  try {
    const teachers = await usermodel.find({ role: "Lecturer", verified: true });

    return res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error("Error during teacher details:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const removeteacher = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    await usermodel.deleteOne({ email: email });
    await teacherlecturecount.delete({ teacheremail: email });
    await quisemodel.delete({ TeacherEmail: email });
    await postmodels.delete({ email: email });
    await Assignment.delete({ TeacherEmail: email });
    await Lecturematerial.delete({ TeacherEmail: email });
    await Getfeedbacksmodel.delete({ teacheremail: email });
    await Announcement.delete({ postedemail: email });
    await profile.delete({ email: email });
    await paymentmodel.delete({ TeacherEmail: email });
    await Enrollment.delete({ teacherEmail: email });
    await studentAttendence.delete({ teachetmail: email });
    await StudentpayemtStates.delete({ TeacherEmail: email });
    await marksModel.delete({  teacherEmail: email });
    return res
      .status(200)
      .json({ success: true, msg: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error during teacher deletion:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export { studentdetails, removeStudent, teacherdetails, removeteacher };
