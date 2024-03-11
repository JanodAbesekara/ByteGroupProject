import usermodel from "../models/usermodel.js";

const studentdetails = async (req, res) => {
    try{
        const students = await usermodel.find({ role: "Student" });
        
        return res.status(200).json({ success: true, data: students });
       

    } catch (error) {
        console.error("Error during student details:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};


const  removeStudent = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        await usermodel.deleteOne({ email });
        return res.status(200).json({ success: true, msg: "Student deleted successfully" });
    }
    catch (error) {
        console.error("Error during student deletion:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

const teacherdetails = async (req, res) => {
    try{
        const teachers = await usermodel.find({ role: "Lecturer" });
        
        return res.status(200).json({ success: true, data: teachers });
       

    } catch (error) {
        console.error("Error during teacher details:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

const removeteacher = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        await usermodel.deleteOne({ email });
        return res.status(200).json({ success: true, msg: "Teacher deleted successfully" });
    }
    catch (error) {
        console.error("Error during teacher deletion:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

export { studentdetails , removeStudent,teacherdetails,removeteacher };
