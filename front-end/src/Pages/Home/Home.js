import React from "react";
import "./Home.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { IoTimeOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

export default function Home() {
  const [text] = useTypewriter({
    words: ["Dream Learn Academy"], // Use 'words' instead of 'word'
    loop: true,
    typeSpeed: 100,
  });

  return (
    <div>
      <Navbar />
      <div className="main_img">
        <h2>{text}</h2>
        <p>
          Welcome to Dream Learn Academy, At DreamLearn, we're dedicated to
          helping students excel in their academic journey. Our personalized
          tuition services and supportive learning community empower students to
          reach their full potential. From exam preparation to skill
          enhancement, DreamLearn Academy is here to guide you every step of the
          way. Join us and let's make your dreams a reality!
        </p>
      </div>
      <div className="main_icons">
        <div className="icons">
          <img src="./logos/teacher.png" alt="teacher panel" />
          <img src="./logos/parent.png" alt="parent controlling" />
          <img src="./logos/quiz.png" alt="quiz" />
          <img src="./logos/service.png" alt="services" />
          <img src="./logos/feedback.png" alt="feedback" className="h1" />
        </div>
      </div>
      <div
        className="textEffects"
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <div className="upper_side">
          <div
            className="textEffect"
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: " #3A935C",
            }}
          >
            <div className="default">
              <FaHandHoldingDollar
                style={{
                  color: "#fff",
                  height: "35px",
                  width: "35px",
                  color: "lightgreen",
                }}
              />
              <p style={{ color: "#fff" }}>Tuition at your Budget</p>
            </div>
            <p className="text">
              Teachers set their Tuition fees. Students can search the suitable
              teachers which fits to their budget and requirements.
            </p>
          </div>
          
          <div
          className="textEffect"
            style={{ width: "200px", height: "200px", backgroundColor: "#69A8D0" }}
          >
            <div className="default">
              <SiGoogleclassroom
                style={{
                  color: "#fff",
                  height: "35px",
                  width: "35px",
                  color: "lightblue",
                }}
              />
              <p style={{ color: "#fff" }}>Virtual Classroom</p>
            </div>
            <p className="text">
            Teachers can do a videoconference to teach students and student can chat with the tutor during the sessions.
            </p>
          </div>
        </div>

        <div className="down_side">
          <div
            className="textEffect"
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#A270D7",
            }}
          >
            <div className="default">
              <LiaChalkboardTeacherSolid
                style={{
                  color: "#fff",
                  height: "35px",
                  width: "35px",
                  color: "lightpurple",
                }}
              />
              <p style={{ color: "#fff" }}>Teachers Selection</p>
            </div>
            <p className="text">
            Students can select their Teacher's based on their needs. You get the teacher in the tuition rate which you expects.
            </p>
          </div>

          <div
            className="textEffect"
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#FFE302",
            }}
          >
            <div className="default">
              <IoTimeOutline
                style={{
                  color: "#fff",
                  height: "35px",
                  width: "35px",
                  color: "lightyellow",
                }}
              />
              <p style={{ color: "#fff" }}>Flexibility</p>
            </div>
            <p className="text">
            Students can take tuitions from anywhere in the world at any time and there is no minimum or maximum subjects.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
