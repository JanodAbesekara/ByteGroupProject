import React from "react";
import Logo from "../Componenet/images.png";
import './LogoSearch.css'
import  {UilSearch }  from "@iconscout/react-unicons";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="This is company logo" style={{width:"70px", height:"70px"}} />
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;