import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { FaFilePdf, FaFileVideo, FaFileAudio } from "react-icons/fa";

function Displayresources() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFille();
  }, []);

  const getFille = () => {
    axios
      .get(`api/auth/fileurlsend`)
      .then((response) => {
        setFiles(response?.data?.data || []);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    const paylord = { _id: id };

    axios

      .post(`/api/auth/deletefile`, paylord)
      .then((res) => {
        getFille();
        window.alert("File Deleted Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        window.alert("Error deleting data:", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "darkslateblue",
                  color: "white",
                  borderRight: "2px white solid",
                }}
              >
                Added File
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "darkslateblue",
                  color: "white",
                  borderRight: "2px white solid",
                }}
              >
                Topic
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "darkslateblue",
                  color: "white",
                  borderRight: "2px white solid",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "darkslateblue",
                  color: "white",
                  borderRight: "2px white solid",
                }}
              >
                Media
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "darkslateblue",
                  color: "white",
                  borderRight: "2px white solid",
                }}
              >
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files
              .slice(0)
              .reverse()
              .map((file) => (
                <TableRow key={file._id}>
                  <TableCell align="center">
                    {file.PDFurl && (
                      <Link to={file.PDFurl} target="_blank">
                        <FaFilePdf
                          style={{
                            color: "#FF0000",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </Link>
                    )}
                    {file.videoUrl && (
                      <Link to={file.videoUrl} target="_blank">
                        <FaFileVideo
                          style={{
                            color: "#0033E7",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </Link>
                    )}
                    {file.audioUrl && (
                      <Link to={file.audioUrl} target="_blank">
                        <FaFileAudio
                          style={{
                            color: "purple",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </Link>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {file.discriP}
                    {file.discriV}
                    {file.discriA}
                  </TableCell>
                  <TableCell align="center">
                    {file.pdfS}
                    {file.videos}
                    {file.audios}
                  </TableCell>
                  <TableCell align="center">
                    {file.pdfmedia}
                    {file.videoMedia}
                    {file.audioMedia}
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleDelete(file._id)}>
                      Remove
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

export default Displayresources;
