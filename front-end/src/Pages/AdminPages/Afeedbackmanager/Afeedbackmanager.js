import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import Rating from "@mui/material/Rating";

import "./Afeedbackmanager.css"; // Import CSS file for styles

function Afeedbackmanager() {
  const [groupedFeedbackData, setGroupedFeedbackData] = useState({});

  useEffect(() => {
    const getFeedbackData = async () => {
      try {
        const response = await axios.get(`/api/auth/feedbackget`);
        const feedbackData = response.data.data;
        const groupedData = groupFeedbackData(feedbackData);
        setGroupedFeedbackData(groupedData);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    getFeedbackData();
  }, []);

  const groupFeedbackData = (data) => {
    const groupedData = {};

    data.forEach((feedback) => {
      const { teacheremail, feedSubject, feedmedium } = feedback;
      if (!groupedData[teacheremail]) {
        groupedData[teacheremail] = {};
      }
      if (!groupedData[teacheremail][feedSubject]) {
        groupedData[teacheremail][feedSubject] = {};
      }
      if (!groupedData[teacheremail][feedSubject][feedmedium]) {
        groupedData[teacheremail][feedSubject][feedmedium] = [];
      }
      groupedData[teacheremail][feedSubject][feedmedium].push(feedback);
    });

    return groupedData;
  };

  const handleDelete = async (_id) => {

    const isconform = window.confirm(
      "Do you want to delete this FeedBack?"
    );

    if (!isconform) return;

    try {
      await axios.post(`/api/auth/deletefeedback`, { _id });
      setGroupedFeedbackData((prevGroupedData) => {
        const newGroupedData = { ...prevGroupedData };
        Object.keys(newGroupedData).forEach((teacheremail) => {
          Object.keys(newGroupedData[teacheremail]).forEach((feedSubject) => {
            Object.keys(newGroupedData[teacheremail][feedSubject]).forEach(
              (feedmedium) => {
                newGroupedData[teacheremail][feedSubject][feedmedium] =
                  newGroupedData[teacheremail][feedSubject][feedmedium].filter(
                    (feedback) => feedback._id !== _id
                  );
              }
            );
          });
        });
        return newGroupedData;
      });
      window.alert("Feedback Deleted Successfully");
    } catch (error) {
      window.alert("Error deleting feedback: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box className="feedback-container" sx={{ marginLeft: "15px" }}>
            <p
              style={{
                color: "#333A73",
                fontSize: "28px",
                fontWeight: "650",
                textAlign: "center",
                paddingBottom: "30px",
                paddingTop: "40px",
              }}
            >
              Feedback Management
            </p>
            {Object.keys(groupedFeedbackData).length > 0 ? (
              Object.keys(groupedFeedbackData).map((teacheremail) =>
                Object.keys(groupedFeedbackData[teacheremail]).map(
                  (feedSubject) =>
                    Object.keys(
                      groupedFeedbackData[teacheremail][feedSubject]
                    ).map((feedmedium) => (
                      <div key={`${teacheremail}-${feedSubject}-${feedmedium}`}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "auto",
                            backgroundColor: "#F0F8FF",
                            padding: "10px 0",
                            borderRadius: "5px",
                            color: "#fff",
                          }}
                        >
                          <p
                            style={{
                              width: "auto",
                              display: "flex",
                              fontSize: "14px",
                              backgroundColor: "green",
                              paddingTop: "4px",
                              paddingBlock: "4px",
                              borderRadius: "4px",
                            }}
                          >
                            {teacheremail}
                          </p>
                          <p
                            style={{
                              width: "auto",
                              display: "flex",
                              fontSize: "13px",
                              color: "blue",
                            }}
                          >
                            {feedSubject} ({feedmedium})
                          </p>
                        </div>

                        <TableContainer
                          component={Paper}
                          className="table-container"
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                {[
                                  "Teacher Email",
                                  "Subject",
                                  "Medium",
                                  "Student Email",
                                  "Feedback",
                                  "Rating",
                                  "Action",
                                ].map((header) => (
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      backgroundColor: "#124076",
                                      color: "#fff",
                                      borderRight: "2px solid white",
                                      fontSize: "16px",
                                    }}
                                    key={header}
                                  >
                                    {header}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {groupedFeedbackData[teacheremail][feedSubject][
                                feedmedium
                              ].map((row) => (
                                <TableRow key={row._id}>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {row.teacheremail}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {row.feedSubject}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {row.feedmedium}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {row.studentemail}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {row.feedtext}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <Rating
                                      name="simple-controlled"
                                      value={row.value}
                                      readOnly
                                    />
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <button
                                      className="delete-btn"
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      Delete
                                    </button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    ))
                )
              )
            ) : (
              <p>No feedbacks available</p>
            )}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Afeedbackmanager;
