import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));


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

      {notifications.map((notification) => {
        return (
          <DialogContent dividers>
            <h3>{notification.titleofAnn}</h3>
            <Typography
              gutterBottom
              sx={{ border: "2px solid black", padding: "10px" ,margin:"20px"}}
            >
              {notification.Announcementmessage}
            </Typography>
            <span>{notification.date.split("T")[0]}</span>
          </DialogContent>
        );
      })}
    </BootstrapDialog>
  )
}

export default Popupbox

