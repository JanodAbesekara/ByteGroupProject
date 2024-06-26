import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

function Popupbox({ open, handleClose, notifications }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2, color: "#fff", backgroundColor:"#628078", fontWeigh:"500" }} id="customized-dialog-title">
        Notification
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
              <div style={{backgroundColor:"#F0F8FF",margin:"5px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            padding:"15px", paddingBottom:"35px"}}>
              <h4 style={{ textAlign: "center", color:"#00a0a0" ,fontSize:"18px"}}>
                {notification.TeacheSubject} <span style={{fontSize:"12px", color:"gray"}}>({notification.mediua})</span>
              </h4>
              <p style={{ marginBottom: "10px",marginTop:"15px", fontSize:"13px", color:"gray",fontWeight:"600" }}>
                <span style={{color:"red"}}>*</span>{notification.titleofAnn}
              </p>
              <p style={{ textAlign: "left", marginTop: "15px", fontSize:"13px",marginBottom:"10px" }}>
                {notification.Announcementmessage}
              </p>
              <p style={{ float: "right", fontSize: "11px",marginBottom:"10px"}}>
                {notification.date.split("T")[0]}
              </p>
              </div>
            </DialogContent>
          ))}
      </ScrollableContent>
    </BootstrapDialog>
  );
}

export default Popupbox;
