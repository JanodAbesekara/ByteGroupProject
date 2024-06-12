import React, { useEffect, useState } from "react";
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
import Axios from "axios";
import "./ADashbord.css";

function ADashbord() {
  const [admins, setAdmins] = useState([]);
  const [admincreate, setAdmincreate] = useState(" ");
  const [admincount, setAdmincount] = useState(0);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await Axios.get(`/api/user/admindisplay`);
        setAdmins(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAdmins();

    for (let i = 0; i < admins.length; i++) {
      setAdmincount(admins.length);
    }
  }, [admins.length]);

  const handleDelete = async (_id) => {
    try {
      await Axios.post(`/api/user/admindelete`, {
        id: _id,
      });
      setAdmins(admins.filter((admin) => admin._id !== _id));
      window.alert("Admin deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting admin:", error);
      window.alert("Error deleting admin");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(admincreate === " "){
      window.alert("Please enter email address");
      return;
    }
    try {
      await Axios.post(`/api/user/admincreate`, {
        email: admincreate,
      });
      window.alert("Admin created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating admin:", error);
      window.alert("Error creating admin");
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
            <div>
              <div className="Count_AD">
                <h2>Admin count :- {admincount}</h2>
              </div>

              <div className="Form_Ad">
                <h3>Create Admins</h3>
                <form onSubmit={handleSubmit}>
                  <label>EmailAddress : - </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => setAdmincreate(e.target.value)}
                  />
                  <br></br>
                  <button type="submit"> Submit </button>
                </form>
              </div>
            </div>
            <div className="StudentDetal">
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  color: "#333A73",
                  marginTop: "100px",
                  marginBottom: "50px",
                }}
              >
                <b>Admin Details</b>
              </h3>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        color: "white",
                        backgroundColor: "#124076",
                        borderRight: "2px white solid",
                        fontSize: "18px",
                      }}
                    >
                      Admin Name
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "white",
                        backgroundColor: "#124076",
                        borderRight: "2px white solid",
                        fontSize: "18px",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "white",
                        backgroundColor: "#124076",
                        borderRight: "2px white solid",
                        fontSize: "18px",
                      }}
                    >
                      Phonenumber
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "white",
                        backgroundColor: "#124076",
                        borderRight: "2px white solid",
                        fontSize: "18px",
                      }}
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.map((Admin) => (
                    <TableRow key={Admin._id}>
                      <TableCell align="center">
                        {Admin.firstname} {Admin.lastname}
                      </TableCell>
                      <TableCell align="center">{Admin.email}</TableCell>
                      <TableCell align="center">{Admin.phonenumber}</TableCell>
                      <TableCell align="center">
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
                          onClick={() => handleDelete(Admin._id)}
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
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default ADashbord;
