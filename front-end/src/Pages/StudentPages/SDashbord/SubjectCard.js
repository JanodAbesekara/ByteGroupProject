import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import { Link } from "react-router-dom";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function SubjectCard() {
  const [Subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/Enrol/getSubject", {
          params: { userEmail: userEmail },
        });

        const filteredSubjects = response.data.data;

        setSubjects(filteredSubjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div>
      {/* <div>
        <h1>Subjects</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>Teacher Email</TableCell>
                <TableCell>Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Subjects.map((subject) => (
                <TableRow key={subject._id}>
                  <TableCell>{subject.Ensubject}</TableCell>
                  <TableCell>{subject.Enmedium}</TableCell>
                  <TableCell>{subject.teacherEmail}</TableCell>
                 <TableCell><ProfileDisplay teacherEmail={subject.teacherEmail}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div> */}

<div>
    {Subjects.map((subject) => (
      <div
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
        key={subject._id}
      >
        <div
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            marginTop: "20px",
            backgroundColor: "#d5edd6",
            border: "none",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="classcom" style={{ width: "25%", border: "none" }}>
              <Link
                to="/SSubject"
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
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
                  {subject.Ensubject}
                </p>
              </Link>
            </div>
            <div style={{ paddingLeft: "10px", paddingTop: "4px" }}>
              <p
                style={{
                  margin: "4px 0px",
                  color: "#F37933",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                {subject.Enmedium}
              </p>
            </div>
          </div>
        </div>
        </div>
    ))}
    </div>
    </div>
  );
}
