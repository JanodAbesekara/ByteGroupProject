import React from 'react';
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

export default function deleteCreatedAssignments(createdAssignments) {
  console.log('Created Assignments:', createdAssignments);

const deleteAssignment = (id) => {
 
    const confirmation = window.confirm('Are you sure you want to delete the Assignment?');

    if(confirmation ) {
    axios
        .delete(`/api/assignment/delete/${id}`)
        .then((response) => {
          window.alert(response.data.msg);
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error.response.data.msg);
        });
}
} 

    
  return (
    <div>
        <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
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
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {createdAssignments.createdAssignments
              .slice(0)
              .reverse()
              .map((assignment) => (
                <TableRow key={assignment._id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {assignment.TeacherSubject}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {assignment.submedium}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        border: "none",
                        padding: "5px",
                        boxShadow: "2px 1px 10px 0.5px black",
                        borderRadius: "5px",
                      }}
                      onClick={() => deleteAssignment(assignment._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}
