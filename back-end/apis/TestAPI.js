import express from "express";

import {quisecontroller,getlecturematerial,getAssignment} from "../controllers/Testcontroller.js";



const router = express.Router();

// Student side Quise
router.post("/quiseadd", quisecontroller);

// Student side Lecture Material
router.post("/getlecturematerial", getlecturematerial);

// Student side Assignment
router.post("/getAssignment", getAssignment);


export default router;
