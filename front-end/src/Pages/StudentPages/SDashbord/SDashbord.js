import React, { useState, useEffect } from "react";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import "./SDashbord.css";
import Avatar from "@mui/material/Avatar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

function SDashbord() {
  const [user, setUser] = useState("");
  const [url, setUrl] = useState(null);

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
  }, []);

  return (
    <div>
      <Navbar />
      <div className="head">
        <div className="container2">
          <Ssidebar />
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
            </div>
          </div>
          <div className="notification">
        <CircleNotificationsIcon/>
        </div>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default SDashbord;
