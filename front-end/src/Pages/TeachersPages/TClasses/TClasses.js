import React, { useState } from 'react'
import './TClasses.css';
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';
import Classcomponent from './Classcomponent';





export default function TClasses() {

  const  subject = [
    {
      id: 1,
      subjectname: "Physics",
      mediem : "English",

    },
    {
      id:2,
      subjectname: "Chemistry",
      mediem : "English",

    },
    {
      id:3,
      subjectname: "Biology",
      mediem : "English",

    },
    {
      id:4,
      subjectname: "Mathematics",
      mediem : "English",

    },
    {
      id:5,
      subjectname: "Physics",
      mediem : "Sinhala",

    },
    {
      id:6,
      subjectname: "Chemistry",
      mediem : "Sinhala",

    },
    {
      id:7,
      subjectname: "Biology",
      mediem : "Sinhala",

    },
    {
      id:8,
      subjectname: "Mathematics",
      mediem : "Sinhala",

    },
  ];

  const[selectsubject, setselectsubject] = useState(subject );

 

  return (
    <div>
      <Navbar/>
      <Grid container>
    <Grid item md={0.75} sm={1.5} xs={2.2}>
      <Sidebar />
    </Grid>
    <Grid item md={11.25} sm={10.5} xs={9.8}>
      <Box>
        <Classcomponent selectsubject={selectsubject} setselectsubject={setselectsubject} />
      </Box>
    </Grid>
  </Grid>
  <Footer/>
  </div>
  )
}
