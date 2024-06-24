import React, { useState } from "react";
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

function Quisehandle({ subjectquise }) {
  const [setsubjectquise] = useState(subjectquise);

  const deletebutton = async (_id) => {
    const conformation = window.confirm(
      "Are you sure you want to delete this Quise?"
    );

    if (!conformation) {
      return;
    }
    try {
      const response = await axios.post(`/api/Quise/deleteQuise`, { _id });
      if (response && response.data && response.data.message) {
        window.alert(response.data.message);
      } else {
        window.alert("You want to delete this Quise?");
      }
      setsubjectquise((prevsubjectquise) =>
        prevsubjectquise.filter((quise) => quise._id !== _id)
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(error.response.data.message);
      } else {
        window.alert("Deleting Successfull");
      }
    }
  };

  return (
    <div>
      <h1>Quisehandle</h1>

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
                Quise count
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
            {subjectquise
              .slice(0)
              .reverse()
              .map((quise) => (
                <TableRow key={quise._id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {quise.TeacherSubject}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {quise.submedium}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {quise.QuizeNumber}
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
                      onClick={() => deletebutton(quise._id)}
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
  );
}

export default Quisehandle;
