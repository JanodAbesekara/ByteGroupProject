import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function SubjectCard() {
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
      <div>
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
      </div>
    </div>
  );
}

export default SubjectCard;
