import React, { useState, useEffect } from "react";
import "./Dashbord.css";
import Avatar from "@mui/material/Avatar";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { Link } from "react-router-dom";
import Openwindow from "./Openwindow";
import ClassCard from "./ClassCard";

export default function Dashbord() {
  const [user, setUser] = useState("");
  const [url, setUrl] = useState(null);
  const [notifaication, setNotification] = useState([]);
  const [notCount, setNotCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectSubject, setSelectSubject] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      const imageRef = ref(storage, `teacherProfile/${userID}/profile_pic`);
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
    const featchNotification = () => {
      axios
        .get("/api/get/Notifactions")
        .then((response) => {
          const announcements = response.data.announcements;
          setNotification(announcements);
          setNotCount(announcements.length);
        })
        .catch((error) => console.log(error));
    };

    featchNotification();
  }, []);

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

  console.log(selectSubject);

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

              <React.Fragment>
                <Link variant="outlined" onClick={handleClickOpen}>
                  <Box sx={{ display: "flex", gap: 2, float: "right" }}>
                    <Badge badgeContent={notCount}>
                      <Typography fontSize="1.4rem">🔔</Typography>
                    </Badge>
                  </Box>
                </Link>
                <Openwindow
                  open={open}
                  handleClose={handleClose}
                  notifications={notifaication}
                />
              </React.Fragment>
            </div>
          </div>

          {selectSubject.length > 0 ? (
            selectSubject.map((selectSubjects) => (
              <div key={selectSubjects._id}>
                <ClassCard subjectData={selectSubjects} />
              </div>
            ))
          ) : (
            <p>No subjects found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
