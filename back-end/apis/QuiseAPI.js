import express from 'express';
import { createQuizController ,getQuizController } from '../controllers/QuiseController.js';
import assignmentadd  from '../controllers/AssignmentController.js';

const router = express.Router();

router.post("/createQuise", createQuizController);
router.get("/getQuise", getQuizController);

// assignment Api
router.post("/assignment", assignmentadd);

export default router;