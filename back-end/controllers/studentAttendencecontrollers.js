import attendennceSchema from "../models/studentAttendesmodel.js";
import teacherlecture from "../models/TeacherLecturecountmodel.js";

const studentattendenceController = async (req, res) => {
  try {
    const { studentnemail, studentname, subject } = req.body;

    const attendence = new attendennceSchema({
      studentnemail,
      studentname,
      subject,
      isPresent: true,
    });
    await attendence.save();
    res
      .status(201)
      .json({ success: true, msg: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const studentattendencegetController = async (req, res) => {
  try {
    const attendances = await attendennceSchema.find();

    if (!attendances.length) {
      res.status(404).json({ success: false, msg: "No attendence found" });
    } else {
      res.status(200).json({ success: true, data: attendances });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const teacherattendenceController = async (req, res) => {
  try {
    const { teacheremail, leccount, subject ,time } = req.body;

    const lecture = new teacherlecture({
      teacheremail,
      leccount,
      time,
      subject,
    });
    await lecture.save();
    res.status(201).json({ success: true, msg: "Lecture marked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const techerlecturecountget = async (req, res) => {
  try {
    const leccount = await teacherlecture.find();
    if (!leccount.length) {
      res.status(404).json({ success: false, msg: "No lecture count found" });
    } else {
      res.status(200).json({ success: true, data: leccount });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const editlecturecount = async (req, res) => {
  try {
    const { teacheremail, leccount, subject } = req.body;
    const lecture = await teacherlecture.findOne({
      teacheremail: teacheremail,
      subject: subject,
    });
    if (!lecture) {
      res.status(404).json({ success: false, msg: "No lecture count found" });
    } else {
      lecture.leccount = leccount;
      
      await lecture.save();
      res
        .status(200)
        .json({ success: true, msg: "Lecture count updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export {
  studentattendenceController,
  teacherattendenceController,
  studentattendencegetController,
  techerlecturecountget,
  editlecturecount,
};
