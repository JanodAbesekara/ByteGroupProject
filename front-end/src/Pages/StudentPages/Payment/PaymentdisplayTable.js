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
  const [visible,setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      try {
        const response = await axios.get("/api/Test/getdetails", {
          params: { email },
        });
        setPaymentData(response.data.data);
        setVisible(response.data.success);
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
  }
  console.log(PaymentData);

  return (
    <div>
      {visible && (
      <TableContainer component={Paper} sx={{marginBottom:"30px", marginLeft:"4px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={style}>Teacher Email</TableCell>
              <TableCell sx={style}>Subject</TableCell>
              <TableCell sx={style}>Medium</TableCell>
              <TableCell sx={style}>Receipt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PaymentData.map((Payment, index) => (
              <TableRow key={index}>
                <TableCell>{Payment.email}</TableCell>
                <TableCell>{Payment.subject}</TableCell>
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
      )}
    </div>
  );
}

export default PaymentdisplayTable;
