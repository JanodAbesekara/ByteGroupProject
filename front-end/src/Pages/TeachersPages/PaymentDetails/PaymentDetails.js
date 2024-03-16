import React from 'react'
import './PaymentDetails.css';
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from '../../../Component/Navbar/Navbar';
import Footer from '../../../Component/Footer/Footer';

export default function PaymentDetails() {
  return (
    <div>
      <Navbar/>
      <Grid container>
    <Grid item md={0.75} sm={1.5} xs={2.2}>
      <Sidebar />
    </Grid>
    <Grid item md={11.25} sm={10.5} xs={9.8}>
      <Box
        sx={{ width: "100%", height: "1000px", backgroundColor: "Ashe" }}
      >

         <div className="personal_details">

          <div className="text"><p style={
            {
              color: '#1193C7',
              fontWeight: 'bold',
              fontSize: '16px',
            }
          }
          >Payment Details</p></div>
          <br></br>
          <br></br>
          <hr/>
          <br/>
            <div className="details">
              <form > 
                <lebel htmlFor="bankName">
                  <span style={{ color: "red" }}>*</span>Choose Your Bank
                </lebel>
                <br></br>
                {/* <input
                  type="text"
                  className="banks"
                  placeholder="Enter here"
                  // value={subject}
                  // onChange={(e) => setSubject(e.target.value)}
                ></input> */}
                <select style={{
                  height: '32px',
                  width: '350px',
                  borderRadius: '5px',
                  border: '0.5px solid #10155b4d',
                  color: '#969683'
                }}>
                  <option>Commercial Bank</option>
                  <option>Sampath Bank</option>
                  <option>Peoples Bank</option>
                  <option>Bank of Ceylon</option>
                </select>
                <br/>
                <br></br>
                <lebel htmlFor="acno">
                  <span style={{ color: "red" }}>*</span>Enter Your Account Number
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="acno"
                  placeholder="Enter here"
                  // value={degree}
                  // onChange={(e) => setDegree(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="cacno">
                  <span style={{ color: "red" }}>*</span>Confirm Account Number
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="cacno"
                  placeholder="Enter here"
                  // value={experience}
                  // onChange={(e) => setExperience(e.target.value)}
                ></input>
                <br></br>
              </form>
            </div>
            <div className="btn-2">
              <button type="submit">Save</button>
            </div>
          </div> 
      </Box>
    </Grid>
  </Grid>
  <Footer/>
  </div>
  )
}
