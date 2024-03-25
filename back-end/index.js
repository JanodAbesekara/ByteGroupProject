import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cros from "cors";
import bodyParser from "body-parser";
import dbConnect from "./config/dbconnecter.js";
import authAPI from "./apis/authAPI.js";
import emailAPI from "./apis/emailAPI.js";
import chatAPI from "./apis/ChatAPI.js";
import userAPI from "./apis/userAPI.js";
import { createServer } from "http";
import { Server } from "socket.io";



const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 

  

 });

// Connection to the database
dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cros());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(" It's mern ");
});

// APIs
app.use("/api/auth", authAPI);
app.use("/api/email", emailAPI);
app.use("/api/chat", chatAPI);
app.use("/api/user", userAPI);


// Port
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server port ${port}`));
 



io.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});



const socketPort = 4000;
httpServer.listen(socketPort, () => {
  console.log(`Socket.io server listening on port ${socketPort}`);
});