import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const Root = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function VerifyEmail() {
  const navigate = useNavigate();
  const token = useLocation().search.split("=").pop();

  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/email/verify?token=${token}`)
        .then((res) => {
          setTimeout(() => {
            setVerified(true);
            console.log(token);
            navigate("/Login");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      return <p style={{ border: "none" }}>Token not present</p>;
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Root>
        <Typography variant="h2" marginTop={5} gutterBottom component="h2">
          {verified ? "You are verified!" : "Verifying, please wait..."}
        </Typography>
      </Root>
    </>
  );
}
