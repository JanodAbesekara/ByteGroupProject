import React from "react";
import "./Contactus.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

export default function Contactus() {
  return (
    <div className="contact">
      <Navbar />
      <div
        className="login_m2"
        style={{ backgroundColor: "#e2e0e0e9", width: "100%", height: "40px" }}
      ></div>
      <div className="contact_h3">
        <h2>Contact us</h2>
      </div>

      <div className="contact_detal_mail">
        <img src="./contact/mail.png" alt="mail" />
        <h3> dreamlearnacademy@gmail.com</h3>
      </div>
      <div className="contact_detal_call">
        <img src="./contact/phone.png" alt="call" />
        <h3> +91 1234567890</h3>
      </div>
      <div className="contact_detal_location">
        <img src="./Contact/map.png" alt="map" />
        <h3>Srilanka colombo , 7 Gallroad </h3>
      </div>
      <h1>
        Our Main Branch Location
      </h1>
      <div
        className="map"
        style={{
         
        }}
      >
        <div style={{ width: "100%" }}>
          <iframe
            title="Google Map"
            width="100%"
            height="600"
            borderRadius="10px"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=colombo%20,7%20kollupitiya%20gallroad+(Dream%20Learn%20Academy)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps devices</a>
          </iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
