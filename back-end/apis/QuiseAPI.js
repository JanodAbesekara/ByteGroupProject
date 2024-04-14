import express from 'express';
import { createQuizController ,getQuizController } from '../controllers/QuiseController.js';


const router = express.Router();

router.post("/createQuise", createQuizController);
router.get("/getQuise", getQuizController);


export default router;