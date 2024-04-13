import attendennceSchema from "../models/studentAttendesmodel.js";
import teacherlecture from "../models/TeacherLecturecountmodel.js";

const studentattendenceController = async (req, res) => {
  const { studentnemail, studentname, subject, teachetmail } = req.body;

  // Validate required fields
  if (!studentnemail || !studentname || !subject || !teachetmail) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }

  try {
    // Efficiently Find Existing Attendance (if any)
    const existingAttendance = await attendennceSchema.findOne({
      studentnemail,
      subject, // Filter by subject for subject-specific attendance
    });

    let newCountAttendence;

    if (existingAttendance) {
      // Increment countAttendence if record exists for the student and subject
      newCountAttendence = existingAttendance.countAttendence + 1;
      existingAttendance.countAttendence = newCountAttendence; // Update existing document

      await existingAttendance.save(); // Save updated countAttendence
    } else {
      // Create new attendance record if no previous entry exists
      newCountAttendence = 1; // Initial count for new record
      const attendance = new attendennceSchema({
        studentnemail,
        studentname,
        subject,
        countAttendence: newCountAttendence,
        teachetmail,
      });
      await attendance.save();
    }

    res
      .status(201)
      .json({ success: true, msg: "Attendance marked successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
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
  const { teacheremail, leccount, subject, time } = req.body;
  if (!teacheremail || !leccount || !subject || !time) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }
  try {
    const lecture = new teacherlecture({
      teacheremail,
      leccount,
      time,
      subject,
    });

    await lecture.save();

    res.status(201).json({ success: true, msg: "Lecture marked successfully" });
  } catch (error) {
    console.error(error);
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

const displayteacherattendence = async (req, res) => {
  try {
    const teacherattendence = await teacherlecture.find({});
    const oldteacherattendence = await teacherlecture.findOne({
      teacherattendence,
    });

    if (oldteacherattendence) {
      return res
        .status(403)
        .json({ success: false, msg: "Details already exists" });
    } else {
      return res.status(200).json({ success: true, data: teacherattendence });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "internal Server Error" });
  }
};

const editlecturecount = async (req, res) => {
  try {
    const { teacheremail, leccount, time, subject } = req.body;
    teacherlecture
      .updateOne(
        { teacheremail: teacheremail, subject: subject },
        { $set: { leccount: leccount, time: time } }
      )
      .then((result) => {
        res.status(200).json({ success: true, msg: "Lecture Time and Count updated "});
      });
  } catch (error) {
    res.status(500).json({ success: false, msg: "internal Server Error" });
  }
};

export {
  studentattendenceController,
  teacherattendenceController,
  studentattendencegetController,
  techerlecturecountget,
  displayteacherattendence,
  editlecturecount,
};
