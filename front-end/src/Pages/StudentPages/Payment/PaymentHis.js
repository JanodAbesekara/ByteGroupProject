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

  const style = {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "25px",
    fontWeight: "700",
    fontFamily: "Teko, sans-serif",
    color: "#fff",
    wordSpacing: "5px",
    letterSpacing: "2px",
    backgroundColor: "#3498DB",
    borderRadius: "4px",
  };

  const menuStyle = {
    color: "#28a745",
    fontWeight: "650",
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
            <div>
              {RegTeachers.map((RegT, index) => (
                <div
                  key={index}
                  style={{
                    margin: "50px",
                    border: "1px solid #F8F9F9",
                    padding: "10px",
                    backgroundColor: "#EAEDED",
                    borderRadius: "3px",
                  }}
                >
                  <p style={style}>
                    {RegT.subject}
                    <span style={{ fontSize: "15px", color: "#fd7e14" }}>
                      ({RegT.medium})
                    </span>
                  </p>
                  <p
                    style={{
                      paddingBottom: "5px",
                      color: "#1193C7",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Payment Details
                  </p>
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingLeft: "10px",
                      backgroundColor: "#fff",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "13px",
                      marginBlock: "10px",
                    }}
                  >
                    <p>
                      <span style={menuStyle}>Teacher Email</span> :{" "}
                      <span style={{ color: "gray" }}>
                        <a href={`mailto:${RegT.email}`} style={{ color: "gray" ,textDecoration:"none"}}>{RegT.email}</a>
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
                      <span style={menuStyle}>Fees Amount</span> :{" "}
                      <span style={{ color: "#dc3545", fontWeight: "500" }}>
                        Rs.{RegT.classpees}
                      </span>
                    </p>
                  </div>
                  <div>
                    <PayCard regdetal={RegT} />
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
