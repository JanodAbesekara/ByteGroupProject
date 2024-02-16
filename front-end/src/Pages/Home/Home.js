import React from 'react'
import "./Home.css";


export default function Home() {
  return (
    <div>
      <div className="space_area"></div>
      <div className="main_img">
        <h2>Dream Learn Academy</h2>
        <p>Welcome to Dream Learn Academy, At DreamLearn, we're dedicated to helping students excel in their academic journey. Our personalized tuition services and supportive learning community empower students to reach their full potential. From exam preparation to skill enhancement, DreamLearn Academy is here to guide you every step of the way. Join us and let's make your dreams a reality!
        </p>
      </div>
      <div className="main_icons">
        <div className="icons">
             <img src="./logos/teacher.png" alt="teacher panel"></img>
             <img src="./logos/parent.png" alt="parent controlling"></img>
             <img src="./logos/quiz.png" alt="tquiz img"></img>
             <img src="./logos/service.png" alt="services"></img>
             <img src="./logos/feedback.png" alt="feedback"></img>
        </div>
      </div> 

    </div> 
  )
}
