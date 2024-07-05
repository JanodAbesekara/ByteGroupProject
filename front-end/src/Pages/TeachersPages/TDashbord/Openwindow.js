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
import "./Openwindow.css";

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

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const useremail = decodedToken.email;

      axios
        .get(`/api/user/getsubjectreg`, {
          params: { email: useremail },
        })
        .then((response) => {
          const filteredSubject = response.data.data;
          setTeacherSubject(filteredSubject);
        })
        .catch((error) => {
          console.error("Error fetching subject data:", error);
        });
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const conform = window.confirm(
      "Are you sure you want to send this notification?"
    );
    if (!conform) {
      return;
    }

    if (!subject || !title || !message) {
      window.alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("MERN_AUTH_TOKEN");

    if (!token) {
      window.alert("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const useremail = decodedToken.email;
      const role = decodedToken.role;

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

      const response = await axios.post(`/api/send/notifaction`, data);
      window.alert(response.data.message);
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred while sending the notification");
      }
    }
  };

  const handleClick = async (announcementId) => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;

    try {
      await axios.post(`/api/video/markAnnouncementAsViewed`, {
        announcementId: announcementId,
        email: useremail,
      });
      console.log("clicked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          justifyContent: "center",
          fontWeight: "600",
          color: "#fff",
          backgroundColor: "#628078",
        }}
        id="customized-dialog-title"
      >
        Notifications
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
            <DialogContent
              key={index}
              dividers
              sx={{
                border: "none",
                margin: "15px",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  color: "#007bff",
                  fontSize: "16px",
                  fontWeight: "550",
                }}
              >
                {notification.titleofAnn}
              </p>
              <p
                style={{
                  textAlign: "left",
                  marginInline: "10px",
                  color: "#6c757d",
                  fontSize: "12px",
                }}
              >
                {notification.Announcementmessage}
              </p>
              <button onClick={() => handleClick(notification._id)}>
                Click
              </button>
              <br></br>
              <span style={{ float: "right", fontSize: "12px" }}>
                {notification.date.split("T")[0]}
              </span>
            </DialogContent>
          ))}
      </ScrollableContent>

      <DialogActions>
        <form onSubmit={handlesubmit} className="FMnotify">
          <label
            htmlFor="title"
            style={{ color: "#136b16", marginLeft: "5px" }}
          >
            Title
          </label>
          <br></br>
          <input
            type="text"
            placeholder="Enter Title"
            style={{
              padding: "5px 10px",
              width: "90%",
              margin: "5px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <label
            htmlFor="message"
            style={{ color: "#136b16", marginLeft: "5px" }}
          >
            Message
          </label>
          <br></br>
          <input
            type="text"
            placeholder="Enter Message"
            style={{
              height: "100px",
              display: "flex",
              width: "90%",
              margin: "5px",
              padding: "10px 10px 70px 10px",
              borderRadius: "4px",
              border: "1px solid gray",
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
                style={{
                  width: "90%",
                  marginBottom: "10px",
                  height: "30px",
                  marginLeft: "5px",
                }}
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
            <button
              type="submit"
              style={{
                width: "90%",
                height: "30px",
                marginLeft: "5px",
                color: "#fff",
                backgroundColor: "#2175ad",
                borderRadius: "3px",
                border: "none",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              Send
            </button>
          </div>
        </form>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default Openwindow;
