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
        <div key={subject}>
          <h2>{subject}</h2>
          {Object.keys(paymentData[subject]).map((medium) => (
            <div key={medium}>
              <h3>{medium}</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Email</TableCell>
                      <TableCell>Recit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData[subject][medium].map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.stuemail}</TableCell>
                        <TableCell>
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
