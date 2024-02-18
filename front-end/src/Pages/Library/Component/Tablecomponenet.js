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
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
                PDF
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
                Video
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
                Audio
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
            rows.length > 0 ? rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component= 'th' scope="row">
                  <Link
                    to={row.pdfLink}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      paddingLeft: "40px",
                    }}
                  >
                    <HtmlTooltip title={row.pdfTopic}>
                      <FaFilePdf
                        style={{
                          color: "#FF0000",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                        {row.pdfSubject}
                    </HtmlTooltip>
                  </Link>
                </TableCell>
                <TableCell  component= 'th' scope="row">
                  <Link
                    to={row.videoLink}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      paddingLeft: "100px",
                      
                    }}
                  >
                   
                    <HtmlTooltip title={row.videoTopic}>
                      <FaFileVideo
                        style={{
                          color: "#0033E7",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                       {row.videoSubject}
                    </HtmlTooltip>
                  </Link>
                </TableCell>
                <TableCell  component= 'th' scope="row">
                  <Link
                    to={row.audioLink}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      paddingLeft: "20px",
                    }}
                  >
                      
                    <HtmlTooltip title={row.audioTopic}>
                      <FaFileAudio
                        style={{
                          color: "#b6891c",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      {row.audioSubject}
                    </HtmlTooltip>
                  </Link>
                </TableCell>
              </TableRow>
            )):(
              <TableRow>
                <TableCell  component= 'th' scope="row"> No Data</TableCell>
              </TableRow>
            )
          }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
