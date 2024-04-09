import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const QRCodeGenerator = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;

    axios
      .get(`/api/auth/getuserdetails`)
      .then((response) => {
        console.log(response.data.data);
        const filteredUserData = response.data.data.filter(user => user.email === useremail); 
        console.log("Filtered Data:", filteredUserData);
        setUserData(filteredUserData.length > 0 ? filteredUserData[0] : null); 
        
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  }, []);

  // Serialize the user data array into a JSON string
  const serializedData = JSON.stringify(userData);

  return (
    <div>
      <h2>QR Code for User Data</h2>
      <QRCode value={serializedData} size={80} />
    </div>
  );
};

export default QRCodeGenerator;
