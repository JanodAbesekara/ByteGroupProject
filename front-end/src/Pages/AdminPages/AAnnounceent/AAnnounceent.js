import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function AAnnounceent() {
  let useremail;
  let role;

  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    useremail = decodedToken.email;
    role = decodedToken.role;
  } else {
    useremail = "";
    role = " ";
  }

  const [Announcementmessage, setAnnouncementmessage] = useState("");
  const [titleofAnn, settitleofAnn] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let TeacheSubject = "";
    if (role === "Admin") {
      TeacheSubject = "System changes";
    }

    const formdata = {
      postedemail: useremail,
      TeacheSubject,
      Announcementmessage,
      titleofAnn,
      date: currentDate.toISOString().split("T")[0],
      time: currentTime,
      jobrole: role,
    };

    try {
      const response = await axios.post(`/api/send/notifaction`, formdata);
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/get/Notify`);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      const response = await axios.post(`/api/delete/notifaction`, { _id: id });
      setAnnouncements(
        announcements.filter((announcement) => announcement._id !== id)
      );
      window.alert(response.data.message);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const groupByEmail = (announcements) => {
    return announcements.reduce((grouped, announcement) => {
      const email = announcement.postedemail;
      if (!grouped[email]) {
        grouped[email] = [];
      }
      grouped[email].push(announcement);
      return grouped;
    }, {});
  };


  const renderAnnouncementsTable = (announcements, title) => (
    <div style={{ marginBottom: "50px" }}>
    <a  href={`mailto:${title}`} ><h2 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h2></a>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Teacher Email</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Subject</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Media</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Title</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Message</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Date</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Time</TableCell>
              <TableCell sx={{ textAlign: "center", backgroundColor: "#1F305E", color: "white" }}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell sx={{ textAlign: "center" }}>{announcement.postedemail}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.TeacheSubject}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.mediua}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.titleofAnn}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.Announcementmessage}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.date.split("T")[0]}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{announcement.time}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      border: "none",
                      padding: "5px",
                      boxShadow: "2px 1px 10px 0.5px black",
                      borderRadius: "5px",
                    }}
                    onClick={() => deleteAnnouncement(announcement._id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const systemChanges = announcements.filter(
    (announcement) => announcement.TeacheSubject === "System changes"
  );

  const announcementsByEmail = groupByEmail(
    announcements.filter(
      (announcement) => announcement.TeacheSubject !== "System changes"
    )
  );

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <div
              className="Announcement"
              style={{ border: "2px solid black", padding: "10px" }}
            >
              <form onSubmit={handleSubmit}>
                <label>Annnouncement Title :- </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  style={{ padding: "5px 10px 5px 2px" }}
                  onChange={(e) => settitleofAnn(e.target.value)}
                />
                <br></br>
                <br></br>

                <label>Announcement Message :- </label>
                <input
                  type="text"
                  placeholder="Enter Message"
                  style={{
                    height: "100px",
                    width: "300px",
                    padding: "10px 10px 70px 10px",
                  }}
                  onChange={(e) => setAnnouncementmessage(e.target.value)}
                />

                <button
                  type="submit"
                  style={{
                    padding: "5px",
                    color: "white",
                    backgroundColor: "#007FFF",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                >
                  send
                </button>
              </form>
            </div>

            <div style={{ marginTop: "150px", marginBottom: "100px" }}>
              <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
                Announcements
              </h1>
              {renderAnnouncementsTable(systemChanges, "System Changes")}
              {Object.keys(announcementsByEmail).map((email) =>
                renderAnnouncementsTable(announcementsByEmail[email], email)
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default AAnnounceent;
