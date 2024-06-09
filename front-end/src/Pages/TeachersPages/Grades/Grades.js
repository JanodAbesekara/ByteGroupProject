import React, { useState,useEffect } from 'react'
import './Grades.css';
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import GradesComponent from './GradeComponent';


export default function Grades() {

  const [selectSubject, setSelectSubject] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodeToken = jwtDecode(token);
    const teacherEmail = decodeToken.email;

    const fetchRegSubjects = async () => {
      try {
        const response = await axios.get(`/api/user/getsubjectreg`, {
          params: { email: teacherEmail },
        });

        const filterRegsubjects = response.data.data;
        setSelectSubject(filterRegsubjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchRegSubjects();
  }, []);

  return (
    <div>
      <Navbar/>
      <Grid container>
    <Grid item md={0.75} sm={1.5} xs={2.2}>
      <Sidebar />
    </Grid>
    <Grid item md={11.25} sm={10.5} xs={9.8}>
      <Box
        sx={{ width: "100%", height: "1000px", backgroundColor: "Ashe" }}
      >

         {selectSubject.length > 0 ? (
            selectSubject.map((subjectData) => (
              <div key={subjectData._id}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:"10px", paddingLeft:"5px" }}>
                  <p>{subjectData.subject}</p>
                  <p>{subjectData.medium}</p>
                </div>
                <GradesComponent subjectDetails={subjectData} />
              </div>
            ))
          ) : (
            <p>No subjects found.</p>
          )}
      </Box>
    </Grid>
  </Grid>
  <Footer/>
  </div>
  )
}
