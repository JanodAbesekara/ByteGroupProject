import express from "express";
import {
  createQuizController,
  getQuizController,
  deleteQuise,
} from "../controllers/QuiseController.js";
import { createAssignmentController } from "../controllers/AssignmentController.js";
import {
  addlecturematerial,
  getlecturematerial,
} from "../controllers/Lecturematerialcontroller.js";

const router = express.Router();
// quises Api
router.post("/createQuise", createQuizController);
router.get("/getQuise", getQuizController);
router.post("/deleteQuise", deleteQuise);

// assignment Api
router.post("/assignment", createAssignmentController);

// lecturematerial Api
router.post("/lecturematerialadd", addlecturematerial);
router.get("/getlecturematerial", getlecturematerial);

export default router;
