import React from 'react'
import './Classes.css';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';



export default function Classes() {
  return (
    <div>
      <Navbar />
      <div className="login_m2" style={{ backgroundColor:"#e2e0e0e9", width: "100%", height: "40px"}}> </div>
        <div className="classes_content">
          <h2>Our E - Wall</h2>
          <div className="A/Lclasses">
            <h3>A/L Classes</h3>
          </div>
        </div>
      <Footer />
      </div>
  )
}
