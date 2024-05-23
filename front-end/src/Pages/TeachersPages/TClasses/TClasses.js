import React, { useState ,useEffect  } from "react";
import "./TClasses.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Classcomponent from "./Classcomponent";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import AddingLectures from "./AddingLectures";

export default function TClasses() {
  const [selectsubject, setselectsubject] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchregsubjects = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        if (!token) {
          throw new Error("No token found");
        }
        const decodeToken = jwtDecode(token);
        const teacheremail = decodeToken.email;

<<<<<<< Updated upstream
        const response = await axios.get(`/api/user/getsubjectreg`);
        console.log(response.data.data);
        const filterRegsubjects = response.data.data.filter(
          (regsubject) => regsubject.email === teacheremail
        );
        console.log(filterRegsubjects);
        setselectsubject(filterRegsubjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data: " + error.message);
      }
    };
=======
  const fetchregsubjects = async () => {
    try {
      const response = await axios.get(`/api/user/getsubjectreg`);
      const filterRegsubjects = response.data.data.filter(
        (regsubject) => regsubject.email === teacheremail
      );
      setselectsubject(filterRegsubjects);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
>>>>>>> Stashed changes

    fetchregsubjects();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            {error && <p>{error}</p>}
            {selectsubject.map((selectsubjects) => (
              <div key={selectsubjects._id}>
                <Classcomponent
                  subjectData={selectsubjects}
                  key={selectsubjects._id}
                />
                <AddingLectures subjectData={selectsubjects} />
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
