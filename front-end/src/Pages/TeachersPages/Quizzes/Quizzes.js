import React from "react";
import "./Quizzes.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';
<<<<<<< HEAD
=======
import Setquise from './Component/Setquise';
import Enterquizes from './Component/Enterquizes';


const Quise = [

  {
    Subject: "Maths",
    Date: "2022-09-01",
    time: "30 min",
  },
  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 min",
  },
  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 min",
  },

  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 min",
  }
];
>>>>>>> main

export default function Quizzes() {
  return (
    <div>
      <Navbar />
      <Grid container>
    <Grid item md={0.75} sm={1.5} xs={2.2}>
      <Sidebar />
    </Grid>
    <Grid item md={11.25} sm={10.5} xs={9.8}>
<<<<<<< HEAD
      <Box
        sx={{ width: "100%", height: "1000px", backgroundColor: "Ashe" }}
      ></Box>
=======
      <Box div ={Quise} >
       <Setquise div={Quise}/>
    </Box>
>>>>>>> main
    </Grid>
  </Grid>
  <Footer/>
  </div>
  )
}
