import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { Link } from "react-router-dom";
import axios from "axios";

function SQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/Quise/getQuise`);
        const quises = response.data;
        const filteredQuizes = quises.filter(
          (quise) =>
            quise.TeacherEmail === "teacher@example.com" &&
            quise.TeacherSubject === "Mathematics"
        );
        setQuizzes(filteredQuizes);
      } catch (error) {
        console.log(error);
        window.alert(error.response.data.message);
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
          {quizzes.map((quiz) => (
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
                  <Link to="/ComQuises">
                    <button
                      style={{
                        float: "right",
                        padding: "5px 10px",
                        boxShadow: "2px 1px 10px 0.5px black",
                      }}
                    >
                      {" "}
                      Attempt to Quiz
                    </button>
                  </Link>
                  <p>Subject :- {quiz.TeacherSubject}</p>
              <p>Time range :-{quiz.TimeRanges} minits</p>
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
