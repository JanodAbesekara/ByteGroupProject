import React from "react";
import "./Contactus.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import Lottie from "lottie-react";
import animation from "./Animation/Animation - 1709480913381.json";

export default function Contactus() {
  return (
    <div className="contact">
      <Navbar />
      <div className="contact_h3">
        <h2>Contact us</h2>
      </div>

      <div className="contact_detail_mail">
        <a href="mailto:dreamlearnacademy@gmail.com">
          <img src="./contact/mail.png" alt="mail" />
          <h3>dreamlearnacademy@gmail.com</h3>
        </a>
      </div>
      <div className="contact_detail_call">
        <a href="tel:+911234567890">
          <img src="./contact/phone.png" alt="call" />
          <h3>+91 1234567890</h3>
        </a>
      </div>
      <div className="contact_detail_location">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Srilanka+Colombo,+7+Gallroad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="./contact/map.png" alt="map" />
          <h3>Srilanka Colombo, 7 Gallroad</h3>
        </a>
      </div>

      <Lottie animationData={animation} className="lottie2" />
      <h1>Our Main Branch Location</h1>
      <div className="map" style={{}}>
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
