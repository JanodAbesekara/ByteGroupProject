import express from "express";
const router = express.Router();
import {userProfileController} from "../controllers/userProfileController.js";

router.post("/userProfile", userProfileController);

export default router;