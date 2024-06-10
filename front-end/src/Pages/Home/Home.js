import React from "react";
import "./Home.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Home() {
  const [text] = useTypewriter({
    words: ["Dream Learn Academy"], // Use 'words' instead of 'word'
    loop: true,
    typeSpeed: 100,
  });

  return (
    <div>
      <Navbar />
      <div className="space_area"></div>
      <div className="main_img">
        <h2>{text}</h2>
        <span>
          <Cursor />
        </span>
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
      <Footer />
    </div>
  );
}
