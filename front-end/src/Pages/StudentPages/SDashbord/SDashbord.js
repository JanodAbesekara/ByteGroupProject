import axios from "axios";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { Link } from "react-router-dom";
import Popupbox from "./Popupbox";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import "./SDashbord.css";
import SubjectCard from "./SubjectCard";

function SDashbord() {
  const [notifications, setNotifications] = useState([]);
  const [notCount, setNotCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataN, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    const checkImageExists = async () => {
      const imageRef = ref(storage, `studentProfile/${userID}/profile_pic`);
      try {
        const imageUrl = await getDownloadURL(imageRef);
        setUrl(imageUrl);
      } catch (error) {
        console.log("Error checking image existence:", error.message);
      }
    };

    checkImageExists();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const Stuemail = decodedToken.email;

      try {
        const notificationResponse = await axios.get(`/api/get/notifaction`, {
          params: { email: Stuemail },
        });
        const { announcements, announceme } = notificationResponse.data;

        setNotifications([...announceme, ...announcements]);
        setNotCount(announcements.length + announceme.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
           
            <div className="containe3">
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
                <div className="student_info">
                  <div className="name" style={{ marginBottom: "30px" }}>
                    <p>{user.firstname + " " + user.lastname}</p>
                  </div>
                </div>
                <div className="Notif">
                  <React.Fragment>
                    <Link variant="outlined" onClick={handleClickOpen}>
                      <Box sx={{ display: "flex", gap: 2, float: "right" }}>
                        <Badge badgeContent={notCount}>
                          <Typography fontSize="1.4rem">🔔</Typography>
                        </Badge>
                      </Box>
                    </Link>
                    <Popupbox
                      open={open}
                      handleClose={handleClose}
                      notifications={notifications}
                    />
                  </React.Fragment>
                </div>
              </div>
              <div />
            </div>
            <div>
              <h2>Enrolled Subjects</h2>
               <SubjectCard />
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default SDashbord;
