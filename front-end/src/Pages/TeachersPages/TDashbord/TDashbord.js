import React, { useState, useEffect } from "react";
import "./Dashbord.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Badge from "@mui/material/Badge";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import AR from "./AR";

export default function Dashbord() {





  const [user, setUser] = useState("");
  const [url, setUrl] = useState(null);
  const [details, setDetails] = useState("");






  // getting users name
  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    axios

      .get(`api/user/userProfile/${userID}`)  

      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((err) => console.log(err));


      // Fetch the image URL from localStorage when the component mounts
    const storedUrl = localStorage.getItem("profileImageUrl");
    setUrl(storedUrl);


    axios
      .get(`api/user/dashboard/${userID}`)
      .then((response) => {
        const details = response.data;
        setDetails(details);
      })
      .catch((error) => console.log(error));
    
  }, []);

  return (
    <div>
      <Navbar />
      <div className="head">
        <div className="container2">
          <Sidebar />
        </div>
        <div className="container3">
          <div className="container1">
            <div className="profile_pic">
              <div className="picture">
                <Avatar
                  alt="profile_pic"
                  src={url}
                  sx={{ width: 90, height: 90 }}
                />
               
              </div>
            </div>
            <div className="teacher_info">
              <div className="name">
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
              <div className="info">

              <p><span style={{color: "#de162d", fontSize: "22px", fontWeight: "bold"}}>{details.subject}</span></p>
                <p><span style={{color: "darkblue"}}>{details.degree}</span><br/> 
                   <span style={{color: "#366491", fontStyle: "italic"}}>{details.aboutme}</span> </p>

              </div>
              <Box sx={{ display: "flex", gap: 2, float:"right" }}>
                  <Badge badgeContent="2">
                    <Typography fontSize="xl">🔔</Typography>
                  </Badge>
                </Box>

               
            </div>
          </div>
          <AR imageUrl={url} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
