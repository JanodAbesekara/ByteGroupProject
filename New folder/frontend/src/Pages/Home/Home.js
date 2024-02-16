import React from 'react'
import "./Home.css";
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';


export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="imj">
       
        <h2>Dream Learn Academy</h2>
        <div style={{width:'100%',height:'10px'}}></div>
        <p>At DreamLearn, we're dedicated to helping students excel in their academic journey. Our personalized tuition services and supportive learning community empower students to reach their full potential. From exam preparation to skill enhancement, DreamLearn Academy is here to guide you every step of the way. Join us and let's make your dreams a reality!
        </p>
      </div>
       <div className="new1">
             
             <img src="./Logos/02.jpg" alt='This is aimage of logo'/>
             <img src="./Logos/03.jpg.png" alt='This is aimage of logo' />
             <img src="./Logos/04.jpg" alt='This is aimage of logo'/>
             <img src="./Logos/05.jpg" alt='This is aimage of logo'/>
            
         
       </div> 





      <Footer/>
    </div> 
  )
}
