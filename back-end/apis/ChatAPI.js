import express from "express";
import  {createChatController, userChatController,findChatController,addmessageController,getmessageController

}  from "../controllers/chatContrillers.js";


import {sendMessage} from "../controllers/ChatAppControler.js";

const router = express.Router();

router.post("/createchat", createChatController);
router.get("/createchat:userId", userChatController); 
router.get("/finduser/:firstId/:secondId", findChatController);
router.get("/message/:chatId", getmessageController);
router.post("/message", addmessageController);

// new chat  get and post methods 
router.post("/send/:id",sendMessage);




export default router;