import { Server } from "socket.io";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { postanouncement, getAnnuncements, deleteAnnouncement } from "../controllers/anouncement.js";
import { createChatController, userChatController, findChatController, addmessageController, getmessageController } from "../controllers/chatContrillers.js";
import { getNotifacition, getNotificationT } from "../controllers/Testcontroller.js";

const app = express();
const server = http.createServer(app);

// Use the CORS middleware
app.use(cors({
  origin: 'https://byte-group-project.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: 'https://byte-group-project.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user Connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user Disconnected ", socket.id);
  });
});

app.post("/api/send/notifaction", postanouncement);
app.get("/api/get/notifaction", getNotifacition);
app.post("/api/delete/notifaction", deleteAnnouncement);
app.post("/api/createchat", createChatController);
app.get("/api/createchat/:userId", userChatController); 
app.get("/api/finduser/:firstId/:secondId", findChatController);
app.get("/api/message/:chatId", getmessageController);
app.post("/api/message", addmessageController);
app.get("/api/get/Notifactions", getNotificationT);
app.get("/api/get/Notify", getAnnuncements);

export { app, io, server };
