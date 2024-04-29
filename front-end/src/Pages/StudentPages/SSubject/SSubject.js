import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import Component1 from "./Component1";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SSubject() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/Enrol/getSubject");
        console.log(response.data.data);
        const filteredSubjects = response.data.data.filter(
          (subject) => subject.userEmail === userEmail
        );

        setSubjects(filteredSubjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <Link to="/Enrollment">
              <button>More Courses</button>
            </Link>
            <>
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  style={{
                    width: "100%",
                    height: "600px",
                    border: "2px solid black",
                  }}
                >
                  <h1>{subject.Ensubject}</h1>
                  <h2>{subject.Enmedium}</h2>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Component1
                      teachermail={subject.teacherEmail}
                      subject={subject.Ensubject}
                      Feedmedium ={subject.Enmedium}
                    />
                  </Grid>
                </div>
              ))}
            </>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SSubject;
