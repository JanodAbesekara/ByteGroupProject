import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import Axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

function STeachers() {
  const [subjectdetal, setsubjectdetal] = useState([]);

  useEffect(() => {
    const featchsubject = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const Stuemail = decodedToken.email;

      try {
        const response = await Axios.get(`/api/Enrol/getteacher`);
        const data = response.data.data.filter(
          (item) => item.userEmail === Stuemail
        );
        console.log(data);
        setsubjectdetal(data);
      } catch (error) {
        console.log(error);
      }
    };

    featchsubject();
  }, []);

const handleLogout = async (teacherEmail,Ensubject,Enmedium,userEmail) => {
    try {
      const data = { teacherEmail,Ensubject,Enmedium,userEmail };
     const respond =  await Axios.post(`/api/Enrol/logoutfromclass`, data);
      window.alert(respond.data.msg);
      window.location.reload();
    }catch (error) {
      console.error("Error during logout:", error);
      window.alert(error.respond.data.msg);
    }
  }

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <h1>Enrolled Teachers</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#317873",
                        borderRight: "2px white solid",
                        color: "white",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#317873",
                        borderRight: "2px white solid",
                        color: "white",
                      }}
                    >
                      Subject
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#317873",
                        borderRight: "2px white solid",
                        color: "white",
                      }}
                    >
                      Medium
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#317873",
                        borderRight: "2px white solid",
                        color: "white",
                      }}
                    >
                     Logout
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectdetal.length > 0 &&
                    subjectdetal.map((subjectDetails, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: "center" }}>
                          {subjectDetails.teacherEmail}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {subjectDetails.Ensubject}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {subjectDetails.Enmedium}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <button 
                          onClick={() => handleLogout(subjectDetails.teacherEmail,subjectDetails.Ensubject,subjectDetails.Enmedium,subjectDetails.userEmail)}
                          >Logout</button>
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

export default STeachers;
