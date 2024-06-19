import React, { useState,useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
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
import { jwtDecode } from "jwt-decode";



function SGrades() {

  const [grades,setGrades] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

    axios.get(`api/assignment/getGrade`,{params :{ email:userEmail }})
         .then((response) => {
          setGrades(response.data);
         })
         .catch((error) => {
          console.log(error.response.data);
         })
  },[]);

  const getBackgroundColor = (grade) => {
    if (grade === 'W') {
      return "#ff0000"; // red
    } else if (grade ==='D') {
      return "#ff8000"; // orange
    } else if (grade ==='C') {
      return "#ffff00"; // yellow
    } else if (grade ==='B') {
      return "#80ff00"; // light green
    } else if (grade ==='A') {
      return "#00ff00"; // green
    }else{
      return "#ffffff"; // white
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
          <TableContainer component={Paper} sx={{ margin: "50px 0px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  backgroundColor: "#317873",
                  borderRight: "2px white solid",
                  color: "white",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  backgroundColor: "#317873",
                  borderRight: "2px white solid",
                  color: "white",
                }}
              >
                Medium
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "center",
                  backgroundColor: "#317873",
                  borderRight: "2px white solid",
                  color: "white",
                }}
              >
                Grade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades
            .slice(0)
            .reverse().map((eachOne) => (
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    {eachOne.subject}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {eachOne.medium}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", backgroundColor: getBackgroundColor(eachOne.grade), }}>
                    {eachOne.grade}
                  </TableCell>
                </TableRow>
              ))}
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

export default SGrades;
