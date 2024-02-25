import express from "express";
import {
  registerController,
  loginController,
  forgotpasswordController,
  resetpasswordController,
} from "../controllers/authController.js";
import verifyTokenController from "../controllers/verifyTokenController.js";
import { fileuplodController,fileurlcontroller} from "../controllers/filehandle.js";

const router = express.Router();

// register user api
router.post("/register", registerController);

// login api
router.post("/login", loginController);

// forgotpassword api
router.post("/forgotpassword", forgotpasswordController);

// verify token
router.get("/verifyToken", verifyTokenController);

// Reset password
router.post("/resetpassword", resetpasswordController);

router.post("/fileupload", fileuplodController);

router.get("/fileurlsend", fileurlcontroller);

export default router;
