import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import ComQuizes1 from "./ComQuises1";

function SQuizzes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const StuEmail = decodedToken.email;

      try {
        const response = await axios.post(`/api/Test/quiseadd`, {
          email: StuEmail,
        });
        console.log(response);
        setData(response.data.quizes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          {data.map((quiz) => (
            <Box key={quiz._id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "60%",
                    backgroundColor: "#C3B091",
                    padding: "40px",
                    borderRadius: "20px",
                    marginTop: "40px",
                    marginBottom: "30px",
                    boxShadow: "2px 4px 8px 0.5px black",
                  }}
                >
                  <p style={{ textAlign: "center" }}>
                    Quizzes :- {quiz.QuizeNumber}
                  </p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>Medium :- {quiz.submedium}</p>
                  <p>Time range :- {quiz.TimeRanges} minutes</p>
                  <ComQuizes1 quisedata={quiz} />
                </div>
              </div>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SQuizzes;