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
                  style={{ margin: "50px", border: "2px solid black" }}
                >
                  <h2>{RegT.email}</h2>
                  <h2>{RegT.subject}</h2>
                  <h2>{RegT.medium}</h2>
                  <h2>{RegT.payment.bank}</h2>
                  <h2>{RegT.payment.accountNo}</h2>
                  <h2>{RegT.classpees}</h2>
                  <img
                    src={RegT.profilePicUrl}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "100%",
                    }}
                    alert="padsa_img"
                  />
                  <PayCard regdetal={RegT} />
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
