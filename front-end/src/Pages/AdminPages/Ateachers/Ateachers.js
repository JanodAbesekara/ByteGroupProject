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

function Ateachers() {
  const [teachers, setTeachers] = useState([]);
  const [totalteachers, settotalteachers] = useState(0);

  useEffect(() => {
    getTeachers();

    for (let i = 0; i < teachers.length; i++) {
      settotalteachers(teachers.length);
    }
  }, [teachers.length]);

  const getTeachers = () => {
    Axios.get(`api/auth/teachermangement`)
      .then((response) => {
        setTeachers(response?.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteTeacher = (email) => {
    const payload = { email: email };

    Axios.post(`/api/auth/teacherremove`, payload)
      .then(() => {
        getTeachers();
      })
      .catch((error) => {
        console.log("Axios Error :", error);
      });
  };

  const handleDeleteConfirmation = (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Teacher?"
    );
    if (confirmDelete) {
      deleteTeacher(email);
    }
  };

  // Divide Teachers into chunks of 10
  const chunks = [];
  for (let i = 0; i < teachers.length; i += 10) {
    chunks.push(teachers.slice(i, i + 10));
  }

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ marginBottom: "100px" }}>
            <div style={{ marginLeft: "30px", marginRight: "5px" }}>
              <div className="StudentDetail">
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    color: "#333A73",
                    marginTop: "80px",
                  }}
                >
                  <b>Teachers Details</b>
                </h3>
                <p
                  style={{
                    paddingLeft: "5px",
                    marginTop: "30px",
                    backgroundColor: "gray",
                    borderRadius: "3px",
                    color: "#fff",
                    display: "flex",
                    width: "130px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Total Teachers Count : {totalteachers}
                </p>
              </div>
              {chunks.map((chunk, index) => (
                <TableContainer
                  component={Paper}
                  key={index}
                  sx={{ marginTop: "50px", marginBottom: "40px" }}
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
                          Teacher Name
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
                      {chunk
                        .slice(0)
                        .reverse()
                        .map((teacher, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {teacher.firstname} {teacher.lastname}
                            </TableCell>
                            <TableCell align="center">
                              <a
                                href="mailto:${teacher.email}"
                                style={{ textDecoration: "none" }}
                              >
                                {teacher.email}{" "}
                              </a>
                            </TableCell>
                            <TableCell align="center">
                              <a
                                href="tel : ${teacher.phonenumber}"
                                style={{ textDecoration: "none" }}
                              >
                                {teacher.phonenumber}
                              </a>
                            </TableCell>
                            <TableCell align="center">
                              {new Date(teacher.updatedAt).toLocaleDateString()}
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
                                  handleDeleteConfirmation(teacher.email)
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

export default Ateachers;
