import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function DisplayPayment() {
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      try {
        const response = await axios.get("/api/Test/getpayeddertails", {
          params: { email },
        });
        const data = response.data.data;
        const groupedData = data.reduce((acc, payment) => {
          const { Subject, medium } = payment;
          if (!acc[Subject]) acc[Subject] = {};
          if (!acc[Subject][medium]) acc[Subject][medium] = [];
          acc[Subject][medium].push(payment);
          return acc;
        }, {});
        setPaymentData(groupedData);
      } catch (error) {
        window.alert(error.response ? error.response.data.msg : error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(paymentData).map((subject) => (
        <div key={subject} style={{ marginLeft: "20px", paddingLeft: "15px",
        backgroundColor: "#F0F8FF",
        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        paddingTop:"15px",
        paddingBottom:"20px",
        marginRight:"10px"
      }}>
          <p
            style={{
              backgroundColor: "#27ae60",
              color: "#fff",
              fontWeight: "500",
              fontSize: "20px",
              paddingLeft: "10px",
              paddingTop: "4px",
              paddingBottom: "4px",
              borderRadius: "4px",
              marginRight:"10px"
            }}
          >
            {subject}
          </p>
          {Object.keys(paymentData[subject]).map((medium) => (
            <div key={medium} style={{marginRight:"10px"}}>
              <p
                style={{
                  fontSize: "15px",
                  color: "blue",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  paddingBottom:"8px"
                }}
              >
                {medium}
              </p>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          backgroundColor: "#317873",
                          borderRight: "2px white solid",
                          color: "white",
                        }}
                      >
                        Student Email
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          backgroundColor: "#317873",
                          borderRight: "2px white solid",
                          color: "white",
                        }}
                      >
                        Receipt
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData[subject][medium].map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <a href={`mailto:${payment.stuemail}`} 
                          style={{textDecoration:"none"}}>
                            {payment.stuemail}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          <a href={payment.photourl}>
                            <img
                              src={payment.photourl}
                              style={{
                                width: "80px",
                                height: "80px",
                              }}
                              alt="image_url"
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DisplayPayment;
