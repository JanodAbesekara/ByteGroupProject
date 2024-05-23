import React, { useEffect, useState } from "react";
import "./Assignment.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import SetAssignment from "./Component/SetAssignment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Assignment() {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    const fetchQuse = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        const response = await axios.get(`/api/user/getsubjectreg`);
        const filtersubject = response.data.data.filter(
          (assignmentSubject) => assignmentSubject.email === userEmail
        );
        setAssignment(filtersubject);
        console.log(filtersubject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchQuse();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            {assignment.length > 0 &&
              assignment.map((assignments) => (
                <div key={assignments._id}>
                  <SetAssignment subject={assignments.subject} medium={assignments.medium} />
                </div>
              ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
