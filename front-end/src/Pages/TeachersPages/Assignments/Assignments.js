import React from "react";
import './Assignments.css';
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';
import Quisecom from './QuiseCom';



export default function Assignments() {



  

  return (
    <div>
      <Navbar/>
       <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box >
           <Quisecom/>  
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  )
}
