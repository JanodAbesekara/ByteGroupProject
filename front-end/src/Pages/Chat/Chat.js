import "./Chat.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";




function Chat() {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={4} >
         <Box sx={{backgroundColor:"blue",height:"100%"}}>

         </Box>
        </Grid>
        <Grid item xs={8}>
         
        </Grid>
      </Grid>
    </Box>
  );
}
export default Chat;
