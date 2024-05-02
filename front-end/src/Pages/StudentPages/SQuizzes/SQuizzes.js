import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import ComQuizes1 from "./ComQuises1";


function SQuizzes() {
  const [quizzes3, setQuizzes3] = useState([]);
  const [quizzes1, setQuizzes1] = useState([]);
  const [quizzes2, setQuizzes2] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const StuEmail = decodedToken.email;

      try {
        // Fetching initial data
        const response = await axios.get(`/api/Enrol/getSubject`);
        const filteredData = response.data.data.filter(
          (item) => item.userEmail === StuEmail
        );
        const newData = filteredData.map((item) => ({
          subject: item.Ensubject,
          medium: item.Enmedium,
          email: item.teacherEmail,
        }));
        setData(newData);

        // Fetching quizzes data
        const quizzesResponse = await axios.get(`/api/Quise/getQuise`);
        const quises = quizzesResponse.data;

        const filteredQuizes1 = quises.filter(
          (quise) =>
            newData.some(
              (d) =>
                d.email === quise.TeacherEmail &&
                d.subject === quise.TeacherSubject &&
                d.medium === quise.submedium
            ) && quise.QuizeNumber === 1
        );
        setQuizzes1(filteredQuizes1);

        const filteredQuizes2 = quises.filter(
          (quise) =>
            newData.some(
              (d) =>
                d.email === quise.TeacherEmail &&
                d.subject === quise.TeacherSubject &&
                d.medium === quise.submedium
            ) && quise.QuizeNumber === 2
        );
        setQuizzes2(filteredQuizes2);

        const filteredQuizes3 = quises.filter((quise) =>
          newData.some(
            (d) =>
              d.email === quise.TeacherEmail &&
              d.subject === quise.TeacherSubject &&
              d.medium === quise.submedium &&
              quise.QuizeNumber === 3
          )
        );
        setQuizzes3(filteredQuizes3);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          {quizzes1.map((quiz) => (
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
                    Quizes :- {quiz.QuizeNumber}{" "}
                  </p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>medium :- {quiz.submedium}</p>
                  <p>Time range :-{quiz.TimeRanges} minutes</p>
                  <ComQuizes1 quisedata={quiz} />
                </div>
              </div>
            </Box>
          ))}
          {quizzes2.map((quiz) => (
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
                    Quizes :- {quiz.QuizeNumber}
                  </p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>medium :- {quiz.submedium}</p>
                  <p>Time range :-{quiz.TimeRanges} minutes</p>
                  <ComQuizes1 quisedata={quiz} />
                </div>
              </div>
            </Box>
          ))}
          {quizzes3.map((quiz) => (
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
                    Quizes :- {quiz.QuizeNumber}
                  </p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>medium :- {quiz.submedium}</p>
                  <p>Time range :-{quiz.TimeRanges} minutes</p>
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
