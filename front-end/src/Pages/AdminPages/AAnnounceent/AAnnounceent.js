import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import { jwtDecode } from "jwt-decode"; // Fix import statement
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
  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const useremail = decodedToken.email;
  const role = decodedToken.role;

  const [Announcementmessage, setAnnouncementmessage] = useState("");
  const [titleofAnn, settitleofAnn] = useState("");
  const [announcements, setAnnouncements] = useState([]);

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
      setAnnouncementmessage("");
      settitleofAnn("");

    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/get/notifaction`);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  fetchData();


  const deleteAnnouncement = async (_id) => {
    try {
      const response = await axios.post(`/api/delete/notifaction`, { _id });
      window.alert(response.data.message);
      fetchData();
    } catch (error) {
      window.alert(error.response.data.message);
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

                <button type="submit">send</button>
              </form>
            </div>

            <div style={{ marginTop: "200px" }}>
              <h1 style={{textAlign:"center", marginBottom:"100px"}}>Announcements</h1>

              <TableContainer component={Paper}>
                <Table sx={{marginBottom:"50px",paddingRight:"20px"}}>
                  <TableHead>
                    <TableRow>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Teacher Email</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Subject</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Media</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Title</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Message</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Date</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Time</TableCell>
                      <TableCell  sx={{textAlign:"center",backgroundColor:"blueviolet",color:"white",borderRight:"2px solid white"}}>Active</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {announcements &&
                      announcements.map((announcement) => {
                        console.log(announcement);
                        return (
                          <TableRow key={announcement.id}>
                            <TableCell  sx={{textAlign:"center"}} >{announcement.postedemail}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{announcement.TeacheSubject}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{announcement.mediua}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{announcement.titleofAnn}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>
                              {announcement.Announcementmessage}
                            </TableCell>
                            <TableCell sx={{textAlign:"center"}}>
                              {announcement.date.split("T")[0]}
                            </TableCell>

                            <TableCell sx={{textAlign:"center"}}>{announcement.time}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>
                             <button style={{color:"white",backgroundColor:"red",border:"none" , padding:"5px" ,boxShadow:"2px 1px 10px 0.5px black",borderRadius:"5px"}} onClick={() => deleteAnnouncement(announcement._id)}>Delete</button></TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default AAnnounceent;
