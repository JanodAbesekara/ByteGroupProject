import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cros from "cors";
import bodyParser from "body-parser";
import dbConnect from "./config/dbconnecter.js";
import authAPI from "./apis/authAPI.js";
import emailAPI from "./apis/emailAPI.js";
// import chatAPI from "./apis/ChatAPI.js";
import userAPI from "./apis/userAPI.js";
import {app, io, server} from "./Socket-io/Socketiosever.js";
import QuiseAPI from "./apis/QuiseAPI.js";
import EnrolAPI from "./apis/EnrolAPI.js";



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
// app.use("/api/chat", chatAPI);
app.use("/api/user", userAPI);
app.use("/api/Quise", QuiseAPI);
app.use("/api/Enrol",  EnrolAPI);


// Port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server port ${port}`));



 



