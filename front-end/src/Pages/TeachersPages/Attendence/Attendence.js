import React, { useState, useEffect } from "react";
import { Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, LinearProgress } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Attendance() {
  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const useremail = decodedToken.email;

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        const response = await axios.get(`/api/user/getstudentattendence`);
        const filteredData = response.data.data.filter(
          (item) => item.profile[0].teacheremail === useremail
        );
        setAttendanceData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentAttendance();
  }, [useremail]);

  const getColor = (percentage) => {
    if (percentage < 20) {
      return 'red';
    } else if (percentage < 50) {
      return 'yellow';
    } else if (percentage < 80) {
      return 'green';
    } else {
      return 'blue';
    }
  };

  const groupedData = attendanceData.reduce((acc, item) => {
    const subject = item.profile[0].subject;
    const medium = item.profile[0].media;
    const key = `${subject}-${medium}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>Attendance</Typography>
            {Object.entries(groupedData).map(([key, data]) => {
              const [subject, medium] = key.split("-");
              return (
                <Box key={key} mb={3}>
                  <Typography variant="h6">{`Subject: ${subject} - Medium: ${medium}`}</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Student Email</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Medium</TableCell>
                          <TableCell>Teacher Email</TableCell>
                          <TableCell>Attendance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, index) => {
                          const attendancePercentage = (item.posts.countAttendence / item.profile[0].leccount) * 100;
                          return (
                            <TableRow key={index}>
                              <TableCell>{item.posts.studentnemail}</TableCell>
                              <TableCell>{item.posts.studentname}</TableCell>
                              <TableCell>{item.profile[0].subject}</TableCell>
                              <TableCell>{item.profile[0].media}</TableCell>
                              <TableCell>{item.profile[0].teacheremail}</TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Box width="100%" mr={1}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={attendancePercentage} 
                                      style={{ backgroundColor: getColor(attendancePercentage) }} 
                                    />
                                  </Box>
                                  <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">
                                      {`${attendancePercentage.toFixed(2)}%`}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Attendance;
