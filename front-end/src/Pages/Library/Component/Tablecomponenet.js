import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FaFilePdf, FaFileVideo, FaFileAudio } from "react-icons/fa";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));



const TableComponent = ({ rows }) => {
  const subjects = rows.reduce((acc, row) => {
    const subject = row.pdfSubject || row.videoSubject || row.audioSubject;
    if (!acc[subject]) {
      acc[subject] = { pdfRows: [], videoRows: [], audioRows: [] };
    }
    if (row.pdfLink) acc[subject].pdfRows.push(row);
    if (row.videoLink) acc[subject].videoRows.push(row);
    if (row.audioLink) acc[subject].audioRows.push(row);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(subjects).map((subject) => (
        <div key={subject}>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>{subject}</h2>
          <TableContainer component={Paper} sx={{marginBottom:"40px"}}>
            <Table
              sx={{
                borderRight: "2px white solid",
                borderLeft: "2px white solid",
              }}
            >
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
                    PDF
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
                    Video
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: "20px",
                      backgroundColor: "darkslateblue",
                      color: "white",
                    }}
                  >
                    Audio
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({
                  length: Math.max(
                    subjects[subject].pdfRows.length,
                    subjects[subject].videoRows.length,
                    subjects[subject].audioRows.length
                  ),
                }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {subjects[subject].pdfRows[index] && (
                        <Link
                          to={subjects[subject].pdfRows[index].pdfLink}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            paddingLeft: "10px",
                          }}
                        >
                          <HtmlTooltip
                            title={subjects[subject].pdfRows[index].pdfMedia}
                          >
                            <FaFilePdf
                              style={{
                                color: "#FF0000",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            {subjects[subject].pdfRows[index].pdfTopic}
                          </HtmlTooltip>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      {subjects[subject].videoRows[index] && (
                        <Link
                          to={subjects[subject].videoRows[index].videoLink}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            paddingLeft: "10px",
                          }}
                        >
                          <HtmlTooltip
                            title={
                              subjects[subject].videoRows[index].videomedia
                            }
                          >
                            <FaFileVideo
                              style={{
                                color: "#0033E7",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            {subjects[subject].videoRows[index].videoTopic}
                          </HtmlTooltip>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      {subjects[subject].audioRows[index] && (
                        <Link
                          to={subjects[subject].audioRows[index].audioLink}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            paddingLeft: "2px",
                          }}
                        >
                          <HtmlTooltip
                            title={
                              subjects[subject].audioRows[index].audiomedia
                            }
                          >
                            <FaFileAudio
                              style={{
                                color: "purple",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            {subjects[subject].audioRows[index].audioTopic}
                          </HtmlTooltip>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {subjects[subject].pdfRows.length === 0 &&
                  subjects[subject].videoRows.length === 0 &&
                  subjects[subject].audioRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} style={{ textAlign: "center" }}>
                        No Data
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
