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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(6, 69, 106)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(6, 69, 106)",
    fontSize: "12px",
    padding: "8px",
    marginLeft: "2px",
  },
}));


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
            <BootstrapTooltip
                title="Click to Enroll courses"
                placement="bottom"
                arrow
              >
              <button
                style={{
                  marginBottom: "50px",
                  marginTop: "50px",
                  marginLeft: "85%",
                  padding: "5px 15px ",
                }}
              >
                More Courses
              </button>
              </BootstrapTooltip>
            </Link>
            <>
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  style={{
                    width: "99%",
                    height: "500px",
                    marginright: "5px",
                    marginRight: "10px",
                    marginBottom: "80px",
                    paddingTop: "2px",
                    borderRadius: "20px",
                    backgroundColor: "#B9D9EB",
                  }}
                >
                  <Link
                    to="/Content"
                    className="subject-link"
                    style={{
                      textDecoration: "none",
                     
                    }}
                  >
                    <div
                    className="subject-link"
                      style={{
                        display: "flex",
                        marginTop: "80px",
                        textAlign: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        marginInline: "50px",
                        padding: "20px",
                        borderRadius: "5px",
                        backgroundColor: "#F5FFFA",
                        textDecorationLine: "none",

                        ":hover": {
                          backgroundColor: "#ED7A9B",
                        },
                      }}
                    >
                      <h2 style={{ textAlign: "center", color: "darkblue" }}>
                        {subject.Ensubject}
                      </h2>
                      <h3
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: "black",
                        }}
                      >
                        ({subject.Enmedium})
                      </h3>
                    </div>
                  </Link>

                  <div style={{ marginLeft: "80%" }}>
                    <DisplayAttendence />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "-150px" }}>
                    <Component1
                      teachermail={subject.teacherEmail}
                      subject={subject.Ensubject}
                      Feedmedium={subject.Enmedium}
                    />
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
