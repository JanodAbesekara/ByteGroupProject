import express from 'express';
import { createQuizController } from '../controllers/QuiseController.js';


const router = express.Router();

router.post("/createQuise", createQuizController);


export default router;