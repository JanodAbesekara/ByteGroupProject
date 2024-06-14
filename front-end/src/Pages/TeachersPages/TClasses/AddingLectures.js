import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { BiLogoZoom } from "react-icons/bi";
import { SiMaterialdesignicons } from "react-icons/si";

function AddingLectures({ subjectData }) {
  const [subjectQuiz, setSubjectQuiz] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSubjectQuiz = async () => {
      try {
        const response = await axios.post(`/api/Quise/getlecturematerial`, {
          teacheremail: subjectData.email,
          subject: subjectData.subject,
          medium: subjectData.medium,
        });
        const filteredMaterial = response.data.data;
        setSubjectQuiz(filteredMaterial);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchSubjectQuiz();
  }, [subjectData]);

  const handleDelete = async (_id) => {
    try {
      const response = await axios.post(`/api/Quise/deletelecturematerial`, {
        _id,
      });

      if (response.status === 200) {
        setSubjectQuiz((prev) => prev.filter((item) => item._id !== _id));
        window.alert("Lecture Deleted Successfully");
      } else if (response.status === 404) {
        window.alert("No lecture material found");
      } else {
        window.alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data: " + error.message);
      window.alert("Error deleting data: " + error.message);
    }
  };

  const HandleShow = () => {
    setShowForm(!showForm);
  };
  const HandleHide = () => {
    setShowForm(false);
  };

  const style = {
    backgroundColor: "#28a745",
    padding: "4px",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  }

  return (
    <div>
      {error && <p>{error}</p>}

      {!showForm ? 
      <button onClick={HandleShow} style={style}>Show Added Contents</button> : <button onClick={HandleHide} style={style}>Hide Contents</button> }
      {showForm && (
        <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {["Delete", "Other Link", "Video", "PDF", "Zoom", "Lesson"]
                  .slice(0)
                  .reverse()
                  .map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#317873",
                        borderRight: "2px white solid",
                        color: "white",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectQuiz
                .slice(0)
                .reverse()
                .map((quise) => (
                  <TableRow key={quise._id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {quise.lesson}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {quise.zoom && (
                        <a
                          href={quise.zoom}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BiLogoZoom />
                        </a>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {quise.PDF && (
                        <a
                          href={quise.PDF}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFilePdf />
                        </a>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {quise.video && (
                        <a
                          href={quise.video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PiVideoFill />
                        </a>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {quise.otherlink && (
                        <a
                          href={quise.otherlink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiMaterialdesignicons />
                        </a>
                      )}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleDelete(quise._id)}
                        sx={{
                          backgroundColor: "#317873",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#255d5b",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default AddingLectures;
