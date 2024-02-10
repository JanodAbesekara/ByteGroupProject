import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { IoMdRadioButtonOn } from "react-icons/io";
import "./Insideparts.css";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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

const Insidepart = (props) => {
  return (
    <div
      className="main"
      style={{
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="full">
        <h2 style={{ textAlign: "left" }}>{props.s1}</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={24}>
            <Grid
              item
              xs={8}
              sx={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
              className="G1"
            >
              <h3>PDF</h3>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Tooltip with HTML</Typography>
                    <em>{"And here's"}</em> <b>{"some"}</b>{" "}
                    <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <Link style={{ textDecoration: "none" }}>
                  <span>
                    <BsFileEarmarkPdfFill
                      style={{ color: "Red", width: "30px", height: "30px" }}  
                      arrow/>
                  </span>
                  <span
                    style={{
                      position: "relative",
                      left: "10px",
                      bottom: "8px",
                    }}
                  >
                    {props.v1}
                   
                  </span>
                </Link>
              </HtmlTooltip>
            </Grid>
            <Grid container item xs={16}>
              <Grid
                item
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="G2"
              >
                <h3>Video</h3>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">Tooltip with HTML</Typography>
                      <em>{"And here's"}</em> <b>{"some"}</b>{" "}
                      <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
                    </React.Fragment>
                  }
                >
                  <Link style={{ textDecoration: "none" }}>
                    <span>
                      <BiSolidVideos
                        style={{
                          color: "#028CF5",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        position: "relative",
                        left: "10px",
                        bottom: "8px",
                      }}
                    >
                      {props.v2}
                    </span>
                  </Link>
                </HtmlTooltip>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="G3"
              >
                <h3>Audio</h3>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">Tooltip with HTML</Typography>
                      <em>{"And here's"}</em> <b>{"some"}</b>{" "}
                      <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
                    </React.Fragment>
                  }
                >
                  <Link style={{ textDecoration: "none" }}>
                    <span>
                      <IoMdRadioButtonOn
                        style={{ color: "Red", width: "30px", height: "30px" }}
                      />
                    </span>
                    <span
                      style={{
                        position: "relative",
                        left: "10px",
                        bottom: "8px",
                      }}
                    >
                      {props.v3}
                    </span>
                  </Link>
                </HtmlTooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Insidepart;
