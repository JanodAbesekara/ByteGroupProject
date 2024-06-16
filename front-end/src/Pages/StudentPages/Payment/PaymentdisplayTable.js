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

function PaymentdisplayTable() {
  const [PaymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      try {
        const response = await axios.get("/api/Test/getdertails", {
          params: { email },
        });
        setPaymentData(response.data.data);
      } catch (error) {
        window.alert(error.response ? error.response.data.msg : error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teacher Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>Recit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PaymentData.map((Payment, index) => (
              <TableRow key={index}>
                <TableCell>{Payment.TeacherEmail}</TableCell>
                <TableCell>{Payment.Subject}</TableCell>
                <TableCell>{Payment.medium}</TableCell>
                <TableCell>
                  <a href={Payment.photourl}>
                    <img
                      src={Payment.photourl}
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
  );
}

export default PaymentdisplayTable;
