import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import Zoomatttendence from "../Zoomatttendence";

function SAssignment() {
  const zoomMeetingLink = "https://your-zoom-meeting-link.com";
  
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <h2>
              <center>Assignment</center>
              <a
                href={zoomMeetingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
               Click Me for Zoom Meeting
                <Zoomatttendence />
              </a>
            </h2>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SAssignment;
