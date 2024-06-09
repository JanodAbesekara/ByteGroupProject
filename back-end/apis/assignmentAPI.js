import express from 'express';
import { createAssignmentController ,getAssignmentController,gradeController,deleteAssignmentController,getGrades,getStudentGrades } from '../controllers/assignmentController.js';


const router = express.Router();

router.post("/createAssignment", createAssignmentController); //create assignment and upload to the database
router.get("/getAssignment", getAssignmentController);  //fetch created assignment in students profile
router.post("/grade", gradeController); //assignment marks storing to the database for calcculate grades

router.delete("/delete/:id", deleteAssignmentController) //when user click the delete button this will delete the created assignment
router.get("/getGrade",getGrades); //find grades by using students email and display them on student's grades page
router.get("/getStudentGrades",getStudentGrades) // find grades relevant to the teachers email subject and medium and display them on teacher's side grades page

export default router;