import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import dbConnect from './config/dbconnecter.js';
import authAPI from './apis/authAPI.js';
import emailAPI from './apis/emailAPI.js';

const app = express();

// Connection to the database
dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send(" It's mern ");
});

// APIs
app.use("/api/auth", authAPI);
app.use("/api/email", emailAPI);





// Port
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server port ${port}`));
