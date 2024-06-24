import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import Rating from "@mui/material/Rating";

export default function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    let useremail;

    if (localStorage.getItem("MERN_AUTH_TOKEN")) {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      useremail = decodedToken.email;
    } else {
      useremail = " ";
    }

    axios
      .get(`/api/auth/feedbackget`)
      .then((response) => {
     
        const filteredFeedback = response.data.data.filter(
          (feedback) => feedback.teacheremail === useremail
        );
        setFeedbackData(filteredFeedback);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

  const groupFeedback = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const { feedSubject, feedmedium } = item;
      if (!grouped[feedSubject]) {
        grouped[feedSubject] = {};
      }
      if (!grouped[feedSubject][feedmedium]) {
        grouped[feedSubject][feedmedium] = [];
      }
      grouped[feedSubject][feedmedium].push(item);
    });

    return grouped;
  };

  const groupedFeedback = groupFeedback(feedbackData);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
              Feedbacks
            </h1>
            {Object.keys(groupedFeedback).map((subject) => (
              <div key={subject}>
                <h2>{subject}</h2>
                {Object.keys(groupedFeedback[subject]).map((medium) => (
                  <TableContainer component={Paper} key={medium} style={{ marginBottom: "20px" }}>
                    <h3>{medium}</h3>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              backgroundColor: "#0000B9",
                              color: "white",
                              borderRight: "2px solid white",
                              fontSize: "16px",
                            }}
                          >
                            Student Email
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              backgroundColor: "#0000B9",
                              color: "white",
                              borderRight: "2px solid white",
                              fontSize: "16px",
                            }}
                          >
                            FeedBack
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              backgroundColor: "#0000B9",
                              color: "white",
                              borderRight: "2px solid white",
                              fontSize: "16px",
                            }}
                          >
                            Rating
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {groupedFeedback[subject][medium].map((feedback) => (
                          <TableRow key={feedback._id}>
                            <TableCell sx={{ textAlign: "center" }}>
                              <a href={`malito:${feedback.studentemail}`}>
                              {feedback.studentemail}</a>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {feedback.feedtext}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <Rating
                                name="read-only"
                                value={feedback.value}
                                readOnly
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
