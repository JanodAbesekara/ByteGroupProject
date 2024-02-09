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
        <p>LoreumIpsumLoreumIpsumLoreumIpsumLoreumIpsumLoreumIpsumIpsum
           LoreumIpsumLoreumIpsumLoreumIpsumLoreumIpsumLoreumIpsum
            LoreumIpsumLoreumIpsumLoreumIpsum
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
