import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ScrollableContent = styled("div")({
  maxHeight: "600px",
  overflowY: "auto",
});

function Openwindow({ open, handleClose, notifications }) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [teacherSubject, setTeacherSubject] = useState([]);

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const useremail = decodedToken.email;
  const role = decodedToken.role;

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      titleofAnn: title,
      Announcementmessage: message,
      TeacheSubject: subject.subject,
      postedemail: useremail,
      date: currentDate.toISOString().split("T")[0],
      time: currentTime,
      jobrole: role,
      mediua: subject.medium,
    };

    try {
      const response = await axios.post(`/api/send/notifaction`, data);
      window.alert(response.data.message);
      console.log(data);
      handleClose();
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;

    axios
      .get(`/api/user/getsubjectreg`)
      .then((response) => {
        console.log(response.data.data);
        const filteredSubject = response.data.data.filter(
          (subject) => subject.email === useremail
        );
        console.log("Filtered Subject Data:", filteredSubject);
        setTeacherSubject(filteredSubject);
      })
      .catch((error) => {
        console.error("Error fetching notification data:", error);
      });
  }, []);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Notification Box
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <ScrollableContent>
        {notifications
          .slice(0)
          .reverse()
          .map((notification, index) => (
            <DialogContent key={index} dividers>
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>{notification.titleofAnn}</h3>
              <h4 style={{ textAlign: "center", marginInline: "30px" }}>{notification.Announcementmessage}</h4>
              <br></br>
              <span style={{ float: "right", fontSize: "12px" }}>{notification.date.split("T")[0]}</span>
            </DialogContent>
          ))}
      </ScrollableContent>
      <DialogActions sx={{ display: "flex" }}>
        <div style={{marginRight:"30px"}} >
          <form onSubmit={handlesubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              style={{ width: "100%", padding: "5px 10px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="message">Message</label>
            <input
              type="text"
              placeholder="Enter Message"
              style={{
                height: "100px",
                width: "100%",
                padding: "10px 10px 70px 10px",
              }}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div style={{ marginTop: "20px" }}>
              <div>
                <select
                  onChange={(e) =>
                    setSubject({
                      subject: e.target.value.split(",")[0],
                      medium: e.target.value.split(",")[1],
                    })
                  }
                  style={{ padding: "5px 10px" }}
                >
                  <option value="">Select subject</option>
                  {teacherSubject.map((subject) => (
                    <option
                      key={subject.id}
                      value={`${subject.subject},${subject.medium}`}
                    >
                      {subject.subject} ({subject.medium})
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ float: "right" }}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default Openwindow;
