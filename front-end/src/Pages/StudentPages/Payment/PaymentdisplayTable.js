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

  const style = {
    textAlign: "center",
    backgroundColor: "#317873",
    borderRight: "2px white solid",
    color: "white",
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ marginBottom: "30px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={style}>Teacher Email</TableCell>
              <TableCell sx={style}>Subject</TableCell>
              <TableCell sx={style}>Medium</TableCell>
              <TableCell sx={style}>Recit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PaymentData
                .reverse()
                .map((Payment, index) => (
              <TableRow key={index}>
                <TableCell align="center">{Payment.TeacherEmail}</TableCell>
                <TableCell align="center">{Payment.Subject}</TableCell>
                <TableCell align="center">{Payment.medium}</TableCell>
                <TableCell align="center">
                  <a href={Payment.photourl}>
                    <img
                      src={Payment.photourl}
                      style={{
                        width: "50px",
                        height: "50px",
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
