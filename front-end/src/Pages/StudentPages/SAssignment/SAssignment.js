import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import AssignmentComponent from "./AssignmentComponent";



function SAssignment() {
  const [assignments, setAssignment] = useState([]);
  
  useEffect(() => {
    axios
        .get("/api/assignment/getAssignment")
        .then((response) => {
          const allAssignments = response.data;
          setAssignment(allAssignments);
          console.log(allAssignments);
        })
        .catch((error) => {
          console.log("error");
        });
        
  },[]);
  
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>

            {
              assignments.map((assignment) => (
                <div key= {assignment._id} style={{backgroundColor:"#9fbbdd", margin:"15px", color:"#fff", padding:"3%", border:"none", borderRadius:"7px"}}>
                  <AssignmentComponent assignmentData = {assignment} key={assignment._id}/>
                </div>
              ))
            }

          
           
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SAssignment;
