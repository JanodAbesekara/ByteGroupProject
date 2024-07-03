import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import Axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";

function Astudent() {
  const [students, setStudents] = useState([]);
  const [totalstu, settotalstu] = useState(0);

  useEffect(() => {
    getStudents();

    for (let i = 0; i < students.length; i++) {
      settotalstu(students.length);
    }
  }, [students.length]);

  const getStudents = () => {
    Axios.get(`api/auth/studentget`)
      .then((response) => {
        setStudents(response?.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteStudent = (email) => {
    const isconform = window.confirm(
      "Do you want to delete this announcement?"
    );

    if (!isconform) {
      const payload = { email: email };

      Axios.post(`api/auth/studentpost`, payload)
        .then(() => {
          getStudents();
        })
        .catch((error) => {
          console.log("Axios Error :", error);
        });
    }
  };

  const handleDeleteConfirmation = (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      deleteStudent(email);
    }
  };

  // Divide students into chunks of 10
  const chunks = [];
  for (let i = 0; i < students.length; i += 10) {
    chunks.push(students.slice(i, i + 10));
  }

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <div
              style={{
                marginLeft: "20px",
                marginRight: "10px",
              }}
            >
              <div className="StudentDetal">
                <p
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                    fontSize: "28px",
                    color: "#333A73",
                    marginTop: "100px",
                    paddingLeft: "5px",
                  }}
                >
                  Student Details
                </p>
                <p
                  style={{
                    paddingLeft: "10px",
                    marginTop: "10px",
                    backgroundColor: "gray",
                    color: "#fff",
                    width: "120px",
                    marginLeft: "10px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    borderRadius: "4px",
                  }}
                >
                  Total Student count : {totalstu}
                </p>
              </div>
              {chunks.map((chunk, index) => (
                <TableContainer
                  key={index}
                  component={Paper}
                  sx={{ marginTop: "100px" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            backgroundColor: "#124076",
                            borderRight: "2px white solid",
                            fontSize: "18px",
                          }}
                        >
                          Student Name
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            backgroundColor: "#124076",
                            borderRight: "2px white solid",
                            fontSize: "18px",
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            backgroundColor: "#124076",
                            borderRight: "2px white solid",
                            fontSize: "18px",
                          }}
                        >
                          Contact No
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            backgroundColor: "#124076",
                            borderRight: "2px white solid",
                            fontSize: "18px",
                          }}
                        >
                          Joined Date
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            backgroundColor: "#124076",
                            borderRight: "2px white solid",
                            fontSize: "18px",
                          }}
                        >
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chunk.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell align="center">
                            {student.firstname} {student.lastname}
                          </TableCell>
                          <TableCell align="center">
                            <a href="mailto:${student.email}">
                              {student.email}
                            </a>
                          </TableCell>
                          <TableCell align="center">
                            <a href="tel : ${student.phonenumber}">
                              {student.phonenumber}
                            </a>
                          </TableCell>
                          <TableCell align="center">
                            {new Date(student.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <button
                              style={{
                                padding: "2px 10px",
                                fontSize: "15px",
                                marginLeft: "10px",
                                backgroundColor: "Red",
                                color: "White",
                                borderRadius: "5px",
                                border: "none",
                                boxShadow:
                                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                              }}
                              onClick={() =>
                                handleDeleteConfirmation(student.email)
                              }
                            >
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Astudent;
