import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PayCard from "./PayCard";
import PaymentdisplayTable from "./PaymentdisplayTable";

function PaymentHis() {
  const [RegTeachers, setRegTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        const response = await axios.get("/api/Test/getdetails", {
          params: { email },
        });
        console.log(response.data.data);
        setRegTeachers(response.data.data);
      } catch (error) {
        window.alert(error.response ? error.response.data.msg : error.message);
      }
    };

    fetchData(); // Call the function
  }, []);

  const menuStyle = {
    color: "#28a745",
    fontWeight: "650",
  };
  const emailStyle = {
    color: "gray",
    textDecoration: "none",
    width: "auto",
    display: "flex",
  };

  const emailResponsiveStyle = {
    "@media (max-width: 600px)": {
      fontSize: "12px",
      display:"flex",

    },
  };
  

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Ssidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <div  style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    marginBottom: "100px",
                    width:"auto",
                  }}>
              {RegTeachers.map((RegT, index) => (
                <div
                  key={index}
                  style={{
                    marginLeft: "15px",
                    marginRight: "10px",
                    marginBottom: "100px",
                    paddingBlock:"20px",
                    borderRadius: "3px",
                    backgroundColor: "#F0F8FF",
                    width:"auto",
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                >
                  <p style={{ textAlign:"left",
                    marginBottom: "15px",
                    fontSize: "20px",
                    fontWeight: "400",
                    padding: "3px 8px",                    
                    color: "#fff",
                    backgroundColor: "#27ae60",
                    borderRadius: "4px",
                    marginLeft:"15px",
                    marginRight:"15px",

      }}>
                    {RegT.subject}
                    <span style={{fontSize:"13px",color:"#f9f9f9"}}>
                      ({RegT.medium})
                    </span>
                  </p>
                  <div>
                  <p
                    style={{
                      paddingBottom: "5px",
                      paddingLeft: "10px",
                      color: "#1193C7",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Payment Details
                  </p>
                  <div
                    style={{
                      marginLeft: "5px",
                      marginRight: "5px",
                      paddingLeft: "5px",
                      backgroundColor: "#fff",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "13px",
                      display:"felx",
                      flexDirection:"column",
                      textAlign:"left"
                    }}
                  >
                    <p>
                      <span style={menuStyle}>Teacher Email</span> :{" "}
                      <span style={{ color: "gray" }}>
                        <a href={`mailto:${RegT.email}`} style={{ ...emailStyle, ...emailResponsiveStyle }}>{RegT.email}</a>
                        </span>
                    </p>
                    <p>
                      <span style={menuStyle}>Bank Name</span> :{" "}
                      <span style={{ color: "gray" }}>{RegT.payment.bank}</span>
                    </p>
                    <p>
                      <span style={menuStyle}>Account Number</span> :{" "}
                      <span style={{ color: "#000", fontWeight: "500" }}>
                        {RegT.payment.accountNo}
                      </span>
                    </p>
                    <p>
                      <span style={menuStyle}>Class fee</span> :{" "}
                      <span style={{ color: "#dc3545", fontWeight: "500" }}>
                        Rs.{RegT.classpees}
                      </span>
                    </p>
                  </div>
                  <div style={{width:"auto"}}>
                    <PayCard regdetal={RegT} />
                  </div>
                  </div>
                </div>
              ))}
            </div>
            <PaymentdisplayTable />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default PaymentHis;
