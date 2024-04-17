import express from 'express';
const router = express.Router();
import {  Enrolementcontroller } from '../controllers/Enrolementcontroller.js';


router.get("/enrolement", Enrolementcontroller);

export default router;