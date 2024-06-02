import React, { useState,useEffect } from "react";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import StudentTable from "./StudentTable";



export default function StudentCard ({subject}) {

    const [details,setDetails] = useState([]);

    useEffect(()=> {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodeToken = jwtDecode(token);
        const teacherEmail = decodeToken.email;
        const subjectName = subject.subject;
        const subjectMedium = subject.medium;


    axios
        .get(`/api/Enrol/getEnrolledDetails/${teacherEmail}/${subjectName}/${subjectMedium}`)
        .then((response) => {
            const subjectDetails = response.data.data;
            setDetails(subjectDetails);
        })
        .catch((error) => {
            console.log(error.response.data.msg);
        })
    },[subject]);

    return (
        <div>
        <TableContainer component={Paper} sx={{ marginTop: "100px" }}>
              <p
                  style={{
                    width: "100%",
                    backgroundColor: "#1A8FE3",
                    textAlign: "center",
                    padding: "5px 1px",
                    color: "#fff",
                    margin: "0px",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {subject.subject}
                </p>

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
                      Parents Email
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
                      Parents Phone
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {details.map((user) => (
            <StudentTable key={user._id} studentDetails={user} />
          ))}
                </TableBody>
              </Table>
            </TableContainer>
    </div>
    )
}

{/* <StudentTable studentDetails={user}/> */}