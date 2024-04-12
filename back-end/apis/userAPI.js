import express from "express";
const router = express.Router();
import {userProfileController, userDetailsController, userOtherDetailsController} from "../controllers/userProfileController.js";
import {studentattendenceController, teacherattendenceController, studentattendencegetController,techerlecturecountget,editlecturecount,displayteacherattendence} from "../controllers/studentAttendencecontrollers.js";


router.post("/userProfile", userProfileController);
router.post("/studentattendence", studentattendenceController);
router.get("/studenceattendenceget",studentattendencegetController);
router.get("/techeralectureget",techerlecturecountget);
router.post("/teacherlecture", teacherattendenceController);
router.post("/editlecturecount", editlecturecount);
router.get("/teacherattendence", displayteacherattendence);



router.get("/userProfile/:userID" , userDetailsController);

router.get("/dashboard/:userID", userOtherDetailsController);

export default router;