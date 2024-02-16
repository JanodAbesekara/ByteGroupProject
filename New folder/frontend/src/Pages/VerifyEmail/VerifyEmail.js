import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Classes from "../Classes/Classes";
import axios from "axios";

const Root = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function VerifyEmail() {
  const token = useLocation().search.split("=").pop();

  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState();

  useEffect(() => {
     if(token){
          axios.get(`/api/email/verify?token=${token}`).then(res =>{
             console.log(res);
             setVerified(true);
          }).catch(err =>{
            console.log(err.response);
          })
     }
  },[])

  if (!token) {
    return <p style={{ border: "none" }}>Token not present</p>;
  }

  return (
    <>
      <CssBaseline />
      <Root>
        <Typography variant="h2" marginTop={5} gutterBottom component="h2">
          {
          verified && !error
            ? "You are verified!"
            : error
            ? error
            : "Verifying, please wait..."
            }
        </Typography>
      </Root>
    </>
  );
}