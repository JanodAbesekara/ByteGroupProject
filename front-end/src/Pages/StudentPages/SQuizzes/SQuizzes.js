import React from 'react'
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import { Link } from "react-router-dom";


function SQuizzes() {
  return (
    <div>
       <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
            <div style={{width:"80%", height:"60%",backgroundColor:"#C3B091", padding:"40px", borderRadius:"20px" , marginTop:"40px",marginBottom:"30px", boxShadow:"2px 4px 8px 0.5px black"}}>
              <Link to="/ComQuises"><button style={{float:"right", padding:"5px 10px",boxShadow:"2px 1px 10px 0.5px black"}}> Attempet to Quise</button></Link>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default SQuizzes
