import React, { useState, useEffect } from "react";
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

export default function GradeComponent(subjectDetails) {
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodeToken = jwtDecode(token);
    const teacherEmail = decodeToken.email;
    const subject = subjectDetails.subjectDetails.subject;
    const medium = subjectDetails.subjectDetails.medium;

    axios
      .get(`api/assignment/getStudentGrades`, {
        params: { email: teacherEmail, subject: subject, medium: medium },
      })
      .then((response) => {
        setStudentGrades(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  }, []);

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
      <TableContainer component={Paper} sx={{ margin: "3px 5px" }}>
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
                Student Name
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  backgroundColor: "#317873",
                  borderRight: "2px white solid",
                  color: "white",
                }}
              >
                Student Email
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
         
            {studentGrades.map((student) => (
              <TableRow key={student._id}>
                <TableCell sx={{ textAlign: "center", color: "gray" }}>
                  {student.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center", color: "gray" }}>
                  <a href={`mailto:${student.email}`}>
                  {student.email}</a>
                </TableCell>

                <TableCell sx={{ textAlign: "center" , color: "gray", fontWeight: "500",  backgroundColor: getBackgroundColor(student.grade),}}>

                  {student.grade}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
