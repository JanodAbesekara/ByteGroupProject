import express from 'express';
const router = express.Router();
import {  Enrolementcontroller ,StudentEnrollment ,getSubjects } from '../controllers/Enrolementcontroller.js';


router.get("/enrolement", Enrolementcontroller);
router.post("/studentEnrollment", StudentEnrollment);
router.get("/getSubject", getSubjects);

export default router;