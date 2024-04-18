import express from 'express';
const router = express.Router();
import {  Enrolementcontroller ,StudentEnrollment } from '../controllers/Enrolementcontroller.js';


router.get("/enrolement", Enrolementcontroller);
router.post("/studentEnrollment", StudentEnrollment);

export default router;