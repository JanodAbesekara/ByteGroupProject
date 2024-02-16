import React from "react";
import "./Aboutus.css";
import SideBar from "../TeachersPages/TeacherSidebar/SideBar/Sidebar";
import { Grid, Box } from "@mui/material";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

export default function Aboutus() {
  return (
    <div>
      <Navbar/>
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <SideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box
            sx={{ width: "100%", height: "1000px", backgroundColor: "blue" }}
          ></Box>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}
