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

    const formdata = {
      postedemail: useremail,
      TeacheSubject: "",
      Announcementmessage,
      titleofAnn,
      date: currentDate.toISOString().split("T")[0],
      time: currentTime,
      jobrole: role,
    };

    try {
      const response = await axios.post(`/api/send/notifaction`, formdata);
      console.log(response.data);
      window.alert(response.data.message);
      setAnnouncementmessage("");
      settitleofAnn("");
    } catch (error) {
      console.log(error.response.data);
      window.alert(error.response.data.message);
    }
  };


  
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/get/notifaction`);
      console.log(response.data);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  fetchData();

  const deletehancle = async (_id) => {
    try {
      console.log(_id);
      const response = await axios.delete(`/api/delete/notifaction/${_id}`);
      console.log(response.data);
      window.alert(response.data.message);
      
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);
    }
  };
  


  const handledelete = (_id) =>{
    const conformdelete = window.confirm(
      "Are you sure you want to delete this Announcement"
    );

    if(conformdelete){
      deletehancle(_id);
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Teacher Email</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {announcements &&
                      announcements.map((announcement) => {
                        console.log(announcement);
                        return (
                          <TableRow key={announcement.id}>
                            <TableCell>{announcement.postedemail}</TableCell>
                            <TableCell>{announcement.TeacheSubject}</TableCell>
                            <TableCell>{announcement.titleofAnn}</TableCell>
                            <TableCell>
                              {announcement.Announcementmessage}
                            </TableCell>
                            <TableCell>
                              {announcement.date.split("T")[0]}
                            </TableCell>

                            <TableCell>{announcement.time}</TableCell>
                            <TableCell>
                              <button onClick={()=> handledelete(announcement._id)}>Delete</button>
                            </TableCell>
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
