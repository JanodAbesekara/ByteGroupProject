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
        const response = await axios.get(`/api/Test/quiseadd`, {
          params: { email: StuEmail },
        });
        console.log(response);
        setData(response.data.quizzes);
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
                    backgroundColor: "#F0F8FF",
                    margin: "35px",
                    color: "#000",
                    padding: "3%",
                    border: "none",
                    borderRadius: "7px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        backgroundColor: "#27ae60",
                        borderRadius: "5px",
                        padding: "3px 8px",
                      }}
                    >
                      {quiz.TeacherSubject}
                    </p>
                    <p
                      style={{
                        padding: "3px 8px",
                        color: "#0d09f6",
                      }}
                    >
                      {quiz.submedium}
                    </p>
                  </div>
                  <p
                    style={{
                      padding: "3px 8px",
                      color: "#A9A9A9",
                      fontSize: "13px",
                      
                    }}
                  >
                    Quiz No : {quiz.QuizeNumber}
                  </p>
                  <p
                    style={{
                      padding: "3px 8px",
                      color: "#000",
                      fontSize: "13px",
                    }}
                  >
                    Allocated Time : <span style={{color:"#FF0000"}}>{quiz.TimeRanges} minutes</span>
                  </p>{" "}
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