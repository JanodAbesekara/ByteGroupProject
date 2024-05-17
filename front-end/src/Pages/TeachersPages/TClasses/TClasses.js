import React, { useState, useEffect } from "react";
import "./TClasses.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Classcomponent from "./Classcomponent";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function TClasses() {
  const [selectsubject, setselectsubject] = useState([]);

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodeToken = jwtDecode(token);
  const teacheremail = decodeToken.email;

  const fetchregsubjects = async () => {
    try {
      const response = await axios.get(`/api/user/getsubjectreg`);
      console.log(response.data.data);
      const filterRegsubjects = response.data.data.filter(
        (regsubject) => regsubject.email === teacheremail
      );
      console.log(filterRegsubjects);
      setselectsubject(filterRegsubjects);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchregsubjects();

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            {selectsubject.map((selectsubjects) => (
              <div key={selectsubjects._id}>
                <Classcomponent
                  subjectData={selectsubjects}
                  key={selectsubjects._id}
                />
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
