import { Server } from "socket.io";
import http from "http";
import express from "express";
import {postanouncement, getAnnuncements,deleteAnnounce} from "../controllers/anouncement.js";
import bodyParser from "body-parser";


const app = express();
const server = http.createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user Connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user Disconnected ", socket.id);
  });
});



app.post("/api/send/notifaction", postanouncement);
app.get("/api/get/notifaction",  getAnnuncements);
app.post("/api/delete/notifacition", deleteAnnounce);



export { app, io, server };
