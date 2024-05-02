import express from "express";
const router = express.Router();


import {userProfileController, 
        userDetailsController, 
        userOtherDetailsController, 
        paymentDetailsController, 
        fetchPaymentDetailsController,
        studentParentDetailsController } from "../controllers/userProfileController.js";

import {studentattendenceController, 
        teacherattendenceController, 
        studentattendencegetController, 
        techerlecturecountget, 
        editlecturecount, 
        displayteacherattendence} from "../controllers/studentAttendencecontrollers.js";

import {getregisterdesubject} from "../controllers/SubjectRegistercontroller.js";


router.post("/userProfile", userProfileController);
router.post("/studentattendence", studentattendenceController);
router.get("/studenceattendenceget",studentattendencegetController);
router.get("/techeralectureget",techerlecturecountget);
router.post("/teacherlecture", teacherattendenceController);
router.post("/editlecturecount", editlecturecount);
router.get("/teacherattendence", displayteacherattendence);

router.post("/payment",paymentDetailsController);
router.get("/payment/:userID",fetchPaymentDetailsController);



router.get("/userProfile/:userID" , userDetailsController);

router.get("/dashboard/:userID", userOtherDetailsController);


// subject get from registered
router.get("/getsubjectreg", getregisterdesubject);

//students guardian details
router.post("/guardian",studentParentDetailsController)

export default router;