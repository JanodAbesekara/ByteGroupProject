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
      let StuEmail;

      if (localStorage.getItem("MERN_AUTH_TOKEN")) {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        StuEmail = decodedToken.email;
      } else {
        StuEmail = " ";
      }

      axios
        .get(`/api/Test/getAssignment`, {
          params: { email: StuEmail }
        })
        .then((response) => {
          const allAssignments = response.data.assignments;
          setAssignment(allAssignments);
        })
        .catch((error) => {
          console.log("error");
        });
    };
    feachdata();
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
                  backgroundColor: "#F0F8FF",
                  margin: "35px",
                  color: "#fff",
                  padding: "3%",
                  border: "none",
                  borderRadius: "7px",
                  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
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
