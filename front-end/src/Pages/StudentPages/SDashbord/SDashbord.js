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

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ marginLeft: "20px" }}>
            <div className="container3" style={{ width: "auto" }}>
              <div
                className="container1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "auto",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="teacher_info"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "center",
                    padding: "0",
                  }}
                >
                  <div
                    className="picture"
                    style={{ height: "auto", width: "auto" }}
                  >
                    <Avatar alt="profile_pic" src={url} />
                  </div>
                  <div
                    className="name"
                    style={{
                      display: "flex",
                      paddingLeft: "3px",
                      paddingTop: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{user.firstname + " " + user.lastname}</p>
                  </div>
                </div>

                <div className="notifications_icon">
                  <React.Fragment>
                    <Link variant="outlined" onClick={handleClickOpen}>
                      <Box>
                        <Badge badgeContent={notCount}>
                          <Typography fontSize="1.0rem">🔔</Typography>
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
