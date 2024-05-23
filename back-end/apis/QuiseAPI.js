import express from 'express';
import { createQuizController ,getQuizController ,deleteQuise} from '../controllers/QuiseController.js';
import { createAssignmentController  } from '../controllers/AssignmentController.js';

const router = express.Router();

router.post("/createQuise", createQuizController);
router.get("/getQuise", getQuizController);
router.post("/deleteQuise", deleteQuise);

// assignment Api
router.post("/assignment", createAssignmentController );

export default router;