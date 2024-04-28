import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import Component1 from "./Component1";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DisplayAttendence from "./DisplayAttendence";

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
              <button
                style={{
                  marginBottom: "50px",
                  marginTop: "50px",
                  marginLeft: "90%",
                  padding: "5px 10px ",
                }}
              >
                More Courses
              </button>
            </Link>
            <>
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  style={{
                    width: "99%",
                    height: "500px",
                    boxShadow: "2px 1px 10px 0.5px black",
                    marginright: "5px",
                    marginRight: "10px",
                    marginBottom: "80px",
                    paddingTop: "2px",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginTop: "80px",
                      textAlign: "center",
                    }}
                  >
                    <h2 style={{ textAlign: "center" }}>
                      {subject.Ensubject}{" "}
                    </h2>
                    <h3 style={{ marginTop: "5px", textAlign: "center" }}>
                      ({subject.Enmedium})
                    </h3>
                  </div>

                  <div style={{ marginLeft: "80%", marginTop: "-50px" }}>
                    <Component1
                      teachermail={subject.teacherEmail}
                      subject={subject.Ensubject}
                      Feedmedium={subject.Enmedium}
                    />
                  </div>
                  <div style={{ marginRight: "20%", marginTop: "20px" }}>
                    <DisplayAttendence />
                  </div>
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
