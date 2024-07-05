import express from "express";
import { getNotification, markAnnouncementAsViewed ,getNotificationT } from  "../controllers/AnnounceNECON.js";

const router = express.Router();

router.get("/getNotification", getNotification);
router.post("/markAnnouncementAsViewed", markAnnouncementAsViewed);
router.get("/getNotificationTh", getNotificationT);


export default router;
