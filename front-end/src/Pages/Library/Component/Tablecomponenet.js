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
  const pdfRows = rows.filter((row) => row.pdfLink);
  const videoRows = rows.filter((row) => row.videoLink);
  const audioRows = rows.filter((row) => row.audioLink);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{marginBottom:"20px"}}>
              <TableCell sx={{  fontSize: "20px",paddingInlineStart: "30px" }}>
                PDF
              </TableCell>
              <TableCell sx={{  fontSize: "20px" }}>
                Video
              </TableCell>
              <TableCell sx={{  fontSize: "20px" , textAlign:"center"}}>
                Audio
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Math.max(pdfRows.length, videoRows.length, audioRows.length) > 0 ? (
              Array.from({ length: Math.max(pdfRows.length, videoRows.length, audioRows.length) }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {pdfRows[index] && (
                      <Link
                        to={pdfRows[index].pdfLink}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          paddingLeft: "10px",
                        }}
                      >
                        <HtmlTooltip title={pdfRows[index].pdfTopic}>
                          <FaFilePdf
                            style={{
                              color: "#FF0000",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          {pdfRows[index].pdfSubject}
                        </HtmlTooltip>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {videoRows[index] && (
                      <Link
                        to={videoRows[index].videoLink}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          paddingLeft: "10px",
                        }}
                      >
                        <HtmlTooltip title={videoRows[index].videoTopic}>
                          <FaFileVideo
                            style={{
                              color: "#0033E7",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          {videoRows[index].videoSubject}
                        </HtmlTooltip>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {audioRows[index] && (
                      <Link
                        to={audioRows[index].audioLink}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          paddingLeft: "2px",
                          alignContent: "center",
                        
                        }}
                      >
                        <HtmlTooltip title={audioRows[index].audioTopic}>
                          <FaFileAudio
                            style={{
                              color: "#b6891c",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          {audioRows[index].audioSubject}
                        </HtmlTooltip>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
