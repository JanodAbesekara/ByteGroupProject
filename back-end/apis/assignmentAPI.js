import express from 'express';
import { createAssignmentController ,getAssignmentController } from '../controllers/assignmentController.js';


const router = express.Router();

router.post("/createAssignment", createAssignmentController);
router.get("/getAssignment", getAssignmentController);



export default router;