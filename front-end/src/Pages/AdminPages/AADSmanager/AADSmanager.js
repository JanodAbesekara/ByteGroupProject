import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
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

  const[ads,setAds]=React.useState([
    {
      id:1,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:2,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:3,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:4,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:5,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:6,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:7,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:8,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },
    {
      id:9,
      teacherName:"kamal Gunarathna",
      subject:"Chemistry",
      postedAdd:"https://www.w3schools.com/images"
    },

  ]);  
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Posted ADD</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>{ad.teacherName}</TableCell>
                    <TableCell>{ad.subject}</TableCell>
                    <TableCell>
                   <img
                    src={ad.postedAdd}
                    alt="This is a post add" />  
                    </TableCell>
                    <TableCell>
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
