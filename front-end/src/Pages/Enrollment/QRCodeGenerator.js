import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";


const QRCodeGenerator = ({
  email,
  firstname,
  lastname,
  phonenumber,
  degree,
  experience,
  aboutme,
  
}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData({
      email,
      firstname,
      lastname,
      phonenumber,
      degree,
      experience,
      aboutme,
    });
  }, [email, firstname, lastname, phonenumber, degree, experience, aboutme]);

  // Serialize the user data into a normal format for QR code
  const dataForQRCode = userData
    ? 
     ` Name :- ${userData.firstname} ${userData.lastname}
    Email :- ${userData.email}
    phonenumber :- ${userData.phonenumber}
    Degree :- ${userData.degree}
    Experience :- ${userData.experience}
    About Me :- ${userData.aboutme}`
    : "";

  return <div>{userData && <QRCode value={dataForQRCode} size={80} />}</div>;
};

export default QRCodeGenerator;
