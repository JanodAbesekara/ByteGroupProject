import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import SubjectComponenet from "./SubjectComponenet";

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
                <div key={subject._id}>
                  <SubjectComponenet
                    teachermail={subject.teacherEmail}
                    subject={subject.Ensubject}
                    medium={subject.Enmedium}
                  />
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
