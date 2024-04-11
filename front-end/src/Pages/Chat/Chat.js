import "./Chat.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Chat() {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Link to="">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png"
                alt="circled-left-2"
              />
            </Link>
           
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Chat;
