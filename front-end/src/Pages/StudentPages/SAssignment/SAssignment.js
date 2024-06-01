import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";

import axios from "axios";
import AssignmentComponent from "./AssignmentComponent";
import { jwtDecode } from "jwt-decode";

function SAssignment() {
  const [assignments, setAssignment] = useState([]);

  useEffect(() => {
    const feachdata = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const StuEmail = decodedToken.email;


    axios
      .get(`/api/Test/getAssignment`, {
       params: {email: StuEmail}
      })
      .then((response) => {
        const allAssignments = response.data.assignments;
        setAssignment(allAssignments);
      })
      .catch((error) => {
        console.log("error");
      });

  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                style={{
                  backgroundColor: "#9fbbdd",
                  margin: "15px",
                  color: "#fff",
                  padding: "3%",
                  border: "none",
                  borderRadius: "7px",
                }}
              >
                <AssignmentComponent
                  assignmentData={assignment}
                  key={assignment._id}
                />
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SAssignment;
