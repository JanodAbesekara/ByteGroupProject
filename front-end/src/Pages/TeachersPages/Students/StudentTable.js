import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@mui/material";
import axios from "axios";

const defaultProfilePicUrl =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

function StudentTable({ studentDetails, profilePicUrl }) {
  const [stuDetails, setStudentDetails] = useState({});
  const [parentDetails, setParentDetails] = useState({});

  const displayPicUrl = profilePicUrl || defaultProfilePicUrl;

  const studentEmail = studentDetails.userEmail;
 

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
        {profilePicUrl === "" ? "No Image" : ""}
        <a href={displayPicUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={displayPicUrl}
            alt="profile_image"
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          />
        </a>
      </TableCell>
      <TableCell align="center">
        {stuDetails.firstname} {stuDetails.lastname}
      </TableCell>
      <TableCell align="center">
        <a href={`mailto:${studentDetails.userEmail}`}>
          {studentDetails.userEmail}
        </a>
      </TableCell>
      <TableCell align="center">
        <a href={`mailto:${parentDetails.email}`}>
        {parentDetails.email}</a></TableCell>
      <TableCell align="center">
      <a href={`tel:${parentDetails.mobileNo}`}>{parentDetails.mobileNo}</a>
      </TableCell>
    </TableRow>
  );
}

export default StudentTable;
