import express from "express";

import {quisecontroller,getlecturematerial,getAssignment ,getprofile} from "../controllers/Testcontroller.js";



const router = express.Router();

// Student side Quise
router.get("/quiseadd", quisecontroller);

// Student side Lecture Material
router.get("/getlecturematerial", getlecturematerial);

// Student side Assignment
router.get("/getAssignment", getAssignment);

router.get("/profileget", getprofile)


export default router;
