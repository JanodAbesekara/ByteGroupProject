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

  useEffect(() => {
    const fetchSubjectQuiz = async () => {
      try {
        const response = await axios.get(`/api/Quise/getlecturematerial`);
        console.log("Subject Data:", subjectData);
        console.log("Response Data:", response.data.data);
        const filteredMaterial = response.data.data.filter(
          (item) =>
            item.TeacherEmail === subjectData.email &&
            item.Teachersubject === subjectData.subject &&
            item.Tmedium === subjectData.medium
        );
        console.log("Filtered Material:", filteredMaterial);
        setSubjectQuiz(filteredMaterial);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data: " + error.message);
      }
    };

    fetchSubjectQuiz();
  }, [subjectData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Quise/deletelecturematerial/${id}`);
      setSubjectQuiz(subjectQuiz.filter((quise) => quise._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data: " + error.message);
    }
  };

  return (
    <div>
      <h2>{subjectData.subject}</h2>
      <h3>{subjectData.medium}</h3>
      {error && <p>{error}</p>}
      <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Lesson",
                "Zoom",
                "PDF",
                "Video",
                "Other Link",
                "Edit",
                "Delete",
              ]
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
                    {quise.otherLink && (
                      <a
                        href={quise.otherLink}
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
                      Edit
                    </Button>
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
    </div>
  );
}

export default AddingLectures;
