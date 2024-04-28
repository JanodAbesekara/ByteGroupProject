import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { Link } from "react-router-dom";
import axios from "axios";


function SQuizzes() {
  const [quizzes3, setQuizzes3] = useState([]);
  const [quizzes1, setQuizzes1] = useState([]);
  const [quizzes2, setQuizzes2] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching initial data
        const response = await axios.get(`/api/Enrol/enrolement`);
        const newData = response.data.data.map((item) => ({
          subject: item.profile.subject,
          medium: item.profile.medium,
          email: item.email,
        }));
        console.log(newData);
        setData(newData);

        // Fetching quizzes data
        const quizzesResponse = await axios.get(`/api/Quise/getQuise`);
        const quises = quizzesResponse.data;
        console.log(quises);
        // Filtering quizzes based on subjects, mediums, and emails
        const filteredQuizes1 = quises.filter(
          (quise) =>
            newData.some(
              (d) =>
                d.email === quise.TeacherEmail &&
                d.subject === quise.TeacherSubject &&
                d.medium === quise.submedium
            ) && quise.QuizeNumber === 1
        );
        console.log(filteredQuizes1);
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

        const filteredQuizes3 = quises.filter(quise =>
          newData.some(d =>
            d.email === quise.TeacherEmail &&
            d.subject === quise.TeacherSubject &&
            d.medium === quise.submedium &&
            quise.QuizeNumber === 3
          )
        );
        console.log(filteredQuizes3);
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
                  <p style={{ textAlign: "center" }}>
                    Quizes :- {quiz.QuizeNumber} </p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>meium :- {quiz.submedium}</p>
                  <p>Time range :-{quiz.TimeRanges} minits</p>
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
                  <Link to="/ComQuises2">
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
                  <p style={{ textAlign: "center" }}>
                    Quizes :- {quiz.QuizeNumber}</p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>meium :- {quiz.submedium}</p>
                  <p>Time range :-{quiz.TimeRanges} minits</p>
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
                  <Link to="/ComQuises3">
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
                  <p style={{ textAlign: "center" }}>
                    Quizes :- {quiz.QuizeNumber}</p>
                  <p>Subject :- {quiz.TeacherSubject}</p>
                  <p>meium :- {quiz.submedium}</p>
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
