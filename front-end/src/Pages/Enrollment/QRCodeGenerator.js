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
  classpees,
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
      classpees,
    });
  }, [email, firstname, lastname, phonenumber, degree, experience, aboutme, classpees]);

  // Serialize the user data into a normal format for QR code
  const dataForQRCode = userData

    ? 
    `
    Name :- ${userData.firstname} ${userData.lastname}
    Email :- ${userData.email}
    phonenumber :- ${userData.phonenumber}
    Degree :- ${userData.degree}
    Experience :- ${userData.experience}
    About Me :- ${userData.aboutme}
    ClassFees :- Rs.${userData.classpees}.00`
    : "";

  return <div>{userData && <QRCode value={dataForQRCode} size={80} />}</div>;
};

export default QRCodeGenerator;
