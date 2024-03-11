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


  useEffect(() => {
    getStudents();
  }, []);

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
    const payload = { email: email };

    Axios.post(`api/auth//studentpost`, payload)
      .then(() => {
        getStudents();
      })
      .catch((error) => {
        console.log("Axios Error :", error);
      });
  };

  const handleDeleteConfirmation = (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      deleteStudent(email);
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
          <Box>
              <div className="StudentDetal">
                 <h3 style={{textAlign:"center",fontSize:"30px", color:"#333A73" , marginTop: "100px" }}><b>Student Details</b></h3>
              </div>
            <TableContainer component={Paper} sx={{ marginTop: "100px" }}>
              <Table sx={{ marginBottom: "50px" }}>
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
                      Date of Join
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
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell align="center">
                        {student.firstname}{"  "}{student.lastname}
                      </TableCell>
                      <TableCell align="center">{student.email}</TableCell>
                      <TableCell align="center">
                        {student.phonenumber}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
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
                            boxShadow: "2px 1px 10px 0.5px black",
                          }}
                          onClick={() => handleDeleteConfirmation(student.email)}
                        >
                          Delete
                          <MdDeleteOutline />
                        </button>
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

export default Astudent;
