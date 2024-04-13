import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
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

function Openwindow({ open, handleClose, notifications }) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

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
      TeacheSubject: subject,
      postedemail: useremail,
      date: currentDate.toISOString().split("T")[0],
      time: currentTime,
      jobrole: role,
    };
    console.log(data);

    try {
      const response = await axios.post(`/api/send/notifaction`, data);
      window.alert(response.data.message);
      handleClose();
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

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

      {notifications.map((notification) => {
        return (
          <DialogContent dividers>
            <h3>{notification.titleofAnn}</h3>
            <Typography
              gutterBottom
              sx={{ border: "2px solid black", padding: "10px" }}
            >
              {notification.Announcementmessage}
            </Typography>
            <span>{notification.date.split("T")[0]}</span>
          </DialogContent>
        );
      })}

      <DialogActions sx={{ display: "flex" }}>
        <div>
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
              <select
                onChange={(e) => setSubject(e.target.value)}
                sx={{ padding: "5px 10px" }}
              >
                <option value={" "}>Select subject</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="ICT">ICT</option>
              </select>

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
