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
              <h2 style={{ textAlign: "center" }}>
                {notification.TeacheSubject}
              </h2>
              <h6 style={{ fontSize: "12px",textAlign: "center" , marginBottom: "20px" }}>({notification.mediua})</h6>
              <h3 style={{ marginBottom: "20px" }}>
                {notification.titleofAnn}
              </h3>
              <h4 style={{ textAlign: "center", marginInline: "30px" }}>
                {notification.Announcementmessage}
              </h4>
              <br />
              <span style={{ float: "right", fontSize: "12px" }}>
                {notification.date.split("T")[0]}
              </span>
              <br></br>
            </DialogContent>
          ))}
      </ScrollableContent>
    </BootstrapDialog>
  );
}

export default Popupbox;
