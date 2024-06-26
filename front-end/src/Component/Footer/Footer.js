import "./Footer.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import Notifacition from "../../Pages/Notifacition";

function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const message = form.current.message.value.trim();

    if (!message) {
      window.alert("Please fill the message field");
      return;
    }

    emailjs
      .sendForm("service_1gpq132", "template_7ydso0h", form.current, {
        publicKey: "KCo3zZMarlBJtwG3E",
      })
      .then(
        () => {
          window.alert("SUCCESSFully Sent the message!");
        },
        (error) => {
          window.alert("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="Footer">
      <div className="fbox">
        <div className="rme">
          <h2>Send us a message</h2>
          <form ref={form} onSubmit={sendEmail} style={{display:"flex",flexDirection:"column",width:"auto"}}>
            <input
              className="in1"
              type="email"
              name="user_email"
              placeholder="Your email"
              style={{marginBottom:"18px"}}
            />
            <textarea
              className="in2"
              type="text"
              name="message"
              placeholder="Type your message here"
            />
            <button className="seb" type="submit" value="Send"
            style={{width:"69px"}}>
              Send
            </button>
          </form>
        </div>

        <div className="lme">
          <h2>Get Help</h2>

          <div className="im1">
            <img src="./Symbles/phone.png" alt="phone" />
            <h3>+9477 - 1234 - 567</h3>
          </div>
          <div className="im2">
            <img src="./Symbles/gmail.png" alt="gmail" />
            <a href={"mailto:dreamlearnacademy@gmail.com"} style={{textDecoration:"none",color:"#fff"}}><h3>dreamlearnacademy@gmail.com</h3> </a>
          </div>
        </div>
        <div className="line"></div>

        <div className="fdown">
          <div className="li">
            <h4>@ 2024 DreamLearnAcademy.lk</h4>
          </div>
          <div className="logo3">
            <Link to="">
              <img src="./Symbles/link.png" alt="link" target="_blank" />
            </Link>
            <Link to="">
              <img
                src="./Symbles/facebook.png"
                alt="facebook"
                target="_blank"
              />
            </Link>
            <Link to="">
              <img
                src="./Symbles/whatsapp.png"
                alt="whatsapp"
                target="_blank"
              />
            </Link>
            <Link to="">
              <img src="./Symbles/youtube.png" alt="youtube" target="_blank" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
