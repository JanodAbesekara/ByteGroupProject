import express from 'express';
const router = express.Router();
import {  Enrolementcontroller ,StudentEnrollment ,getSubjects,getstudentregistedteachers } from '../controllers/Enrolementcontroller.js';


router.get("/enrolement", Enrolementcontroller);
router.post("/studentEnrollment", StudentEnrollment);
router.get("/getSubject", getSubjects);
router.get("/getteacher", getstudentregistedteachers);

export default router;