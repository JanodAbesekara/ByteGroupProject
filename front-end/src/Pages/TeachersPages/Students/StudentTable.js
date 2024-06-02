import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@mui/material";
import axios from "axios";

export default function StudentTable({ studentDetails }) {
  const [stuDetails, setStudentDetails] = useState({});
  const [parentDetails, setParentDetails] = useState({});

  const studentEmail = studentDetails.userEmail;
  console.log(studentEmail);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/user/name/${studentEmail}`);
        if (response.data.success) {
          setStudentDetails(response.data.data); // Store the first item in the array
        } else {
          console.error("Failed to fetch student details");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(`/api/user/parent/${studentEmail}`);
        if (response.data.success) {
          setParentDetails(response.data.data); // Store the first item in the array
        } else {
          console.error("Failed to fetch parent details");
        }
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    };

    fetchStudentDetails();
    fetchParentDetails();
  }, [studentEmail]);

  return (
    <TableRow>
      <TableCell align="center">
        {stuDetails.firstname} {stuDetails.lastname}
      </TableCell>
      <TableCell align="center">
        {studentDetails.userEmail}
      </TableCell>
      <TableCell align="center">
        {parentDetails.email}
      </TableCell>
      <TableCell align="center">
        {parentDetails.mobileNo}
      </TableCell>
    </TableRow>
  );
}
