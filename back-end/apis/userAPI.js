import express from "express";
const router = express.Router();
import {userProfileController, userDetailsController, userOtherDetailsController} from "../controllers/userProfileController.js";

router.post("/userProfile", userProfileController);

router.get("/userProfile/:userID" , userDetailsController);

router.get("/dashboard/:userID", userOtherDetailsController);

export default router;