import React, { useEffect ,useState} from "react";
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

function AADSmanager() {

  const[ads,setAds]=React.useState([]);  

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
  }

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


  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <h1>ADS Manager</h1>
            <TableContainer component={Paper}>
              <Table sx={{marginBottom:"50px"}}>
                <TableHead>
                  <TableRow sx={{ marginBottom: "60px", backgroundColor: "#B5DFCA" }}>
                    <TableCell sx={{ textAlign: "center",borderRight:"2px solid white" }}>Teacher Email</TableCell>
                    <TableCell sx={{ textAlign: "center",borderRight:"2px solid white" }}>Subject</TableCell>
                    <TableCell sx={{ textAlign: "center",borderRight:"2px solid white" }}>Media</TableCell>
                    <TableCell sx={{ textAlign: "center",borderRight:"2px solid white" }}>Posted ADD</TableCell>
                    <TableCell sx={{ textAlign: "center",borderRight:"2px solid white" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ads
                  .slice(0)
                  .reverse()
                  .map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell sx={{ textAlign: "center" }}>{ad.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{ad.subject}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{ad.medium}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                   <img
                    src={ad.photosURL}
                    alt="This is a post add"
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",
                    }}
                     />  
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
                        boxShadow:"2px 1px 10px 0.5px black",
                      }}
                      onClick={() => handleDeleteConfirmation(ad.photosURL)}
                      >Delete</button>
                    </TableCell>
                  </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default AADSmanager;
