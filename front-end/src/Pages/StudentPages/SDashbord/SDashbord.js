import axios from "axios";
import React, { useState} from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { Link } from "react-router-dom";
import Popupbox from "./Popupbox";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";


function SDashbord() {


  const [notifaication, setNotification] = useState([]);
  const [notCount, setNotCount] = useState(0);



    // notofication popup
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  


    // notifacition 
    const featchNotification = () => {
      axios
        .get("/api/get/notifaction")
        .then((response) => {
          const announcements = response.data.announcements;
          const filteredMessages = announcements.filter((item) => item.jobrole === "Admin");
          
          axios
          .get(`/api/Enrol/enrolement`)
          .then((response) => {
            const enrolment = response.data.data;
         
            const filteredData = enrolment.map(item => {
              if (item.profile.jobrole === "Lecture") {
                return {
                  email: item.email,
                  subject: item.profile.subject,
                  medium: item.profile.medium
                };
              }
              return null; // Return null for non-lecture job roles
            }).filter(item => item !== null); // Filter out null items
            
            console.log(filteredData);
            
            // Set notification state with filtered messages
            setNotification(filteredMessages);
            
            // Set notification count
            setNotCount(filteredMessages.length);
            
            console.log(filteredMessages);
            console.log(filteredMessages.length);
          })
          .catch((error) => {
            console.error('Error fetching enrolment data:', error);
          });
          
        })
        .catch((error) => console.log(error));
    };
    
    featchNotification();
    

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
          
            <React.Fragment>
                <Link variant="outlined" onClick={handleClickOpen} >
                  <Box sx={{ display: "flex", gap: 2, float: "right", }}>
                  <Badge badgeContent={notCount} >
                      <Typography fontSize="1.4rem" >🔔</Typography>
                    </Badge>
                  </Box>
                </Link>
                <Popupbox open={open} handleClose={handleClose} notifications={notifaication} />
              </React.Fragment>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SDashbord;
