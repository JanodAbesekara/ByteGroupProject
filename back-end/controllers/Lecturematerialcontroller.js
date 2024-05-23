import lecturematerial from "../models/Lecturematerial.js";

const addlecturematerial = async (req, res) => {
  try {
    const {
      lesson,
      Teachersubject,
      Tmedium,
      TeacherEmail,
      zoom,
      PDF,
      video,
      otherlink,
    } = req.body;

    if (
      !lesson ||
      !Teachersubject ||
      !Tmedium ||
      !TeacherEmail ||
      !zoom ||
      !PDF
    ) {
      return res
        .status(400)
        .json({ success: true, msg: "All fields are required" });
    }
    const newlecturematerial = new lecturematerial({
      lesson,
      Teachersubject,
      Tmedium,
      TeacherEmail,
      zoom,
      PDF,
      video,
      otherlink,
    });

    await newlecturematerial.save();
    res
      .status(200)
      .json({ success: true, msg: "Lecture material added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getlecturematerial = async (req, res) => {
  try {
    const lecturematerials = await lecturematerial.find();
    res.status(200).json({ success: true, data: lecturematerials });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export { getlecturematerial, addlecturematerial };
