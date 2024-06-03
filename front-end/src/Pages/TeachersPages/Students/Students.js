import React, { useEffect, useState } from "react";
import "./Students.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import StudentCard from "./StudentCard";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


export default function Students() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodeToken = jwtDecode(token);
    const teacherEmail = decodeToken.email;

    const fetchRegSubjects = async () => {
      try {
        const response = await axios.get(`/api/user/getsubjectreg/${teacherEmail}`);
        const filteredSubjects = response.data.data;
        setSubjects(filteredSubjects);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchRegSubjects();
  }, []);

  console.log(subjects);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            {subjects.map((registeredSubject) => (
              <div key={registeredSubject._id}>
                <StudentCard subject={registeredSubject} />
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
