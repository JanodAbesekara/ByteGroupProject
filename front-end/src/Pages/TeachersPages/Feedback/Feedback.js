import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
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
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;

    axios
      .get(`/api/auth/feedbackget`)
      .then((response) => {
        console.log(response.data.data);
        // Filter feedback data based on useremail
        const filteredFeedback = response.data.data.filter(
          (feedback) => feedback.teacheremail === useremail
        );
        setFeedbackData(filteredFeedback);
        console.log("Filtered Feedback Data:", filteredFeedback);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

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
              Feed Backs
            </h1>
            <TableContainer component={Paper}>
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
                      Subject
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
                  {feedbackData.map((feedback) => {
                    return (
                      <TableRow key={feedback._id}>
                        <TableCell sx={{ textAlign: "center" }}>{feedback.studentemail}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{feedback.subject}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{feedback.feedtext}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Rating
                            name="read-only"
                            value={feedback.value}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
