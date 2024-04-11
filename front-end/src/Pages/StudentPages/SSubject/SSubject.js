import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import Component1 from "./Component1";
import Getattendence from "./GetattendenceCom";

function SSubject() {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <Component1 />
            <br></br><br></br>
            <Getattendence />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SSubject;
