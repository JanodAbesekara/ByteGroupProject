import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./Aaddresources.css";
import ComponentSelect from "./ComponentSelect";

//samithamahedhs@gmail.com 12345678

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Aaddresources() {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <h2>File upload</h2>
            <div className="Resourses">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <div className="pdf" style={{ backgroundColor: "skyblue" }}>
                    <h3 style={{ marginBottom: "50px", paddingTop: "20px" }}>
                      PDF
                    </h3>
                    <ComponentSelect  />
                    <button
                      style={{
                        position: "relative",
                        left: "62px",
                        padding: "5px 10px",
                        backgroundColor: "#2387E8",
                        color: "white",
                        borderBlockColor: "#2387E8",
                        border: "none",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                    >
                      ChooseFiles
                    </button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="video" style={{ backgroundColor: "skyblue" }}>
                    <h3 style={{ marginBottom: "50px", paddingTop: "20px" }}>
                      Video
                    </h3>
                    <ComponentSelect />
                    <button
                      style={{
                        position: "relative",
                        left: "62px",
                        padding: "5px 10px",
                        backgroundColor: "#2387E8",
                        color: "white",
                        borderBlockColor: "#2387E8",
                        border: "none",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                    >
                      ChooseFiles
                    </button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="Adio" style={{ backgroundColor: "skyblue" }}>
                    <h3 style={{ marginBottom: "50px", paddingTop: "20px" }}>
                      Audio
                    </h3>
                    <ComponentSelect />
                    <button
                      style={{
                        position: "relative",
                        left: "62px",
                        padding: "5px 10px",
                        backgroundColor: "#2387E8",
                        color: "white",
                        borderBlockColor: "#2387E8",
                        border: "none",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                    >
                      ChooseFiles
                    </button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Aaddresources;
