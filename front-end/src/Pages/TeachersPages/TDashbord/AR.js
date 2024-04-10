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
        const filteredUserData = response.data.data.filter(
          (user) => user.email === useremail
        );
        console.log("Filtered Data:", filteredUserData);

        const userDataToSet =
          filteredUserData.length > 0
            ? {
                email: filteredUserData[0].email,
                username:
                  filteredUserData[0].firstname +
                  " " +
                  filteredUserData[0].lastname,
                Phonenumber: filteredUserData[0].phonenumber,
              }
            : null;

        setUserData(userDataToSet);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Serialize the user data array into nomal format 
  const dataForQRCode = userData
    ?
`Name:- ${userData.username}
Email:- ${userData.email}
Phonenumber:- ${userData.Phonenumber}`
    : "";
  return (
    <div>
      <h2>QR Code for User Data</h2>
      <QRCode value={dataForQRCode} size={80} />
    </div>
  );
};

export default QRCodeGenerator;
