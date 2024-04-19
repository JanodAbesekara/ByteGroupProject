import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import ComAttendence from "../SSubject/ComAttendence";
import DisplayAttendence from "../SSubject/DisplayAttendence";

function SGrades() {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <ComAttendence />

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <DisplayAttendence />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SGrades;
