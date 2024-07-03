import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./AADSmanager.css";

function AADSmanager() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    getAds();
  }, []);

  const getAds = () => {
    axios
      .get(`api/auth/postdetails`)
      .then((response) => {
        setAds(response?.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deletAds = (photosURL) => {
    const payload = { photosURL: photosURL };

    axios
      .post(`api/auth/deletepost`, payload)
      .then(() => {
        getAds();
      })
      .catch((error) => {
        console.log("Axios Error :", error);
      });
  };

  const handleDeleteConfirmation = (photosURL) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      deletAds(photosURL);
    }
  };

  // Filter ads by teacher email
  const getEmailGroups = () => {
    const emailGroups = {};
    ads.forEach((ad) => {
      if (!emailGroups[ad.email]) {
        emailGroups[ad.email] = [];
      }
      emailGroups[ad.email].push(ad);
    });
    return emailGroups;
  };

  // Render tables for each email group
  const renderEmailTables = () => {
    const emailGroups = getEmailGroups();
    return Object.keys(emailGroups)
      .slice(0)
      .reverse()
      .map((email) => (
        <Box key={email} sx={{ marginBottom: "50px", marginLeft: "30px" }}>
          <div style={{ width: "auto", disply: "flex", paddingRight: "20px" }}>
            <a
              href={`mailto:${email}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "10px",
                  width: "auto",
                  paddingLeft: "4px",
                  color: "blue",
                  display: "flex",
                }}
              >
                {email}
              </p>
            </a>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#124076",
                      color: "white",
                      borderRight: "2px solid white",
                      fontSize: "16px",
                    }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#124076",
                      color: "white",
                      borderRight: "2px solid white",
                      fontSize: "16px",
                    }}
                  >
                    Medium
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#124076",
                      color: "white",
                      borderRight: "2px solid white",
                      fontSize: "16px",
                    }}
                  >
                    Posted Ads
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#124076",
                      color: "white",
                      borderRight: "2px solid white",
                      fontSize: "16px",
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emailGroups[email]
                  .slice(0)
                  .reverse()
                  .map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell sx={{ textAlign: "center" }}>
                        {ad.subject}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {ad.medium}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Link to={ad.photosURL}>
                          <img
                            src={ad.photosURL}
                            alt="This is a post add"
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <button
                          style={{
                            padding: "2px 10px",
                            fontSize: "15px",
                            marginLeft: "10px",
                            backgroundColor: "Red",
                            color: "White",
                            borderRadius: "5px",
                            border: "none",
                            boxShadow: "2px 1px 10px 0.5px black",
                          }}
                          onClick={() => handleDeleteConfirmation(ad.photosURL)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ));
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ marginBottom: "60px" }}>
            <h2
              style={{
                textAlign: "center",
                color: "#333A73",
                marginTop: "40px",
                marginBottom: "30px",
                fontSize: "25px",
              }}
            >
              Ads Manager
            </h2>
            {renderEmailTables()}
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default AADSmanager;
