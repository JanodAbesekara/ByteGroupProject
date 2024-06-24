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
        const response = await axios.get("/api/Enrol/getSubject", {
          params: { userEmail: userEmail },
        });

        const filteredSubjects = response.data.data;

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
                title="Click to See More Courses"
                placement="bottom"
                arrow
              >
                <button
                  style={{
                    marginBottom: "50px",
                    marginTop: "50px",
                    marginLeft: "45px",
                    padding: "5px 10px ",
                    border: "none",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    borderRadius: "3px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                >
                  More Subjects
                </button>
              </BootstrapTooltip>
            </Link>
            <>
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  style={{ marginLeft: "30px", marginRight: "30px" }}
                >
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
