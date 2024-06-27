import express from "express";

import {
  quisecontroller,
  getlecturematerial,
  getAssignment,
  getprofile,
  getdetails,
  poststudentpayment,
  getdertails,
  getdertailsofStu,
  displayAllpayment,
  removeStudentNotpayed,
  getlecturefulldtails,
} from "../controllers/Testcontroller.js";

const router = express.Router();

// Student side Quise
router.get("/quiseadd", quisecontroller);

// Student side Lecture Material
router.get("/getlecturematerial", getlecturematerial);

// Student side Assignment
router.get("/getAssignment", getAssignment);

router.get("/profileget", getprofile);

// get paymentdetails
router.get("/getdetails", getdetails);

// post student payment details
router.post("/poststudentpayment", poststudentpayment);

// get payment tastes

router.get("/getdertails", getdertails);

// getpayement of students
router.get("/getpayeddertails", getdertailsofStu);

// display all paymentdetails
router.get("/displayallpayment", displayAllpayment);

// remove student payment
router.post("/removeStudentpayment", removeStudentNotpayed);

// get teacher details
router.get("/getlecturefulldtails", getlecturefulldtails);

export default router;
