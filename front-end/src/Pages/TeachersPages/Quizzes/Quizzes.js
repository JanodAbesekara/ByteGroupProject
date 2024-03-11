import React from 'react'
import './Quizzes.css';
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';
import Setquise from './Component/Setquise';


const Quise = [

  {
    Subject: "Maths",
    Date: "2022-09-01",
    time: "30 minutes",
  },
  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 minutes",
  },
  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 minutes",
  },

  {
    Subject: "Science",
    Date: "2022-09-01",
    time: "60 minutes",
  }
];

export default function Quizzes() {
  return (
    <div>
      <Navbar/>
      <Grid container>
    <Grid item md={0.75} sm={1.5} xs={2.2}>
      <Sidebar />
    </Grid>
    <Grid item md={11.25} sm={10.5} xs={9.8}>
      <Box div ={Quise}>
       <Setquise div={Quise}/>
    </Box>
    </Grid>
  </Grid>
  <Footer/>
  </div>
  )
}
