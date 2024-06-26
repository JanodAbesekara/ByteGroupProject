import React, { useEffect, useState } from "react";
import "./Assignment.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import SetAssignment from "./Component/SetAssignment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AllAssignments from "./Component/deleteCreatedAssignments";

export default function Assignment() {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        const response = await axios.get(`/api/user/getsubjectreg`, {
          params: { email: userEmail },
        });
        const filtersubject = response.data.data;
        setAssignment(filtersubject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAssignment();
  }, []);

  const [createdAssignment, setCreatedAssignment] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    axios
      .get("/api/assignment/getAssignment")
      .then((response) => {
        const allAssignments = response.data.filter(
          (eachAssignment) => eachAssignment.TeacherEmail === userEmail
        );
        setCreatedAssignment(allAssignments);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [assignment, createdAssignment]);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ marginLeft: "20px" }}>
            {assignment.length > 0 &&
              assignment.map((assignments) => (
                <div key={assignments._id}>
                  <SetAssignment
                    subject={assignments.subject}
                    medium={assignments.medium}
                  />
                </div>
              ))}
            <AllAssignments createdAssignments={createdAssignment} />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
