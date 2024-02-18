import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { IoMdRadioButtonOn } from "react-icons/io";
import "./Insideparts.css";
Subjecttite

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
                   {props.p1}
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
                     {props.p2}
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
                      {props.p3}
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
