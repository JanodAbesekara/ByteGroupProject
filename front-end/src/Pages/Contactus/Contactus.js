import React from "react";
import "./Contactus.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import Lottie from "lottie-react";
import animation from "./Animation/Animation - 1709480913381.json";
import { LuPhoneCall } from "react-icons/lu";
import { MdAttachEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

export default function Contactus() {
  return (
    <div className="contact">
      <Navbar />
      <div className="contact_h3" style={{textAlign:"center"}}>
        <h2>Contact us</h2>
      </div>

      <div className="header">
      
      <div className="contact_detail">
        <a href="mailto:dreamlearnacademy@gmail.com">
        <span><MdAttachEmail style={{width:"30px",height:"30px",marginRight:"10px"}}/></span>
        <p style={{fontSize:"17px"}}>dreamlearnacademy@gmail.com</p> 
        </a>
        <a href="tel:+911234567890" style={{textDecoration:"none"}}>
          <span><LuPhoneCall style={{width:"30px",height:"30px",marginRight:"10px"}}/></span>
          <h3 style={{fontSize:"17px"}}>011 123 456 7</h3>
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Srilanka+Colombo,+7+Gallroad"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration:"none"}}
        >
          <span><IoLocationOutline style={{width:"30px",height:"30px",marginRight:"10px"}}/></span>
          <h3 style={{fontSize:"17px"}}>No 37/1, Galle Road, Dehiwala, Sri Lanka </h3>
        </a>
      </div>

      <div className="animation">
      <Lottie animationData={animation} className="lottie2" />
      </div>
      </div>

      <h1 style={{fontFamily:"Inter",letterSpacing:"0",textAlign:"center"}}>Our Main Branch</h1>
      <div className="map" style={{}}>
        <div style={{ width: "100%",justifyContent:"center" }}>
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
