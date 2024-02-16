import React from "react";
import "./Library.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import Insidepart from "./Component/Insidepart/Insidepart";


const p01 = "This is a peradgraph of organic chemisy=try"
const p02 = "This a pdf aboutt a light and so=und waves"

const Library = () => {
  return (
    <div>
      <Navbar />
      <div className="L_label">
        <h2>Knowledge on your fingertips </h2>
      </div>
      <div className="sb1">
        <Insidepart s1="Chemistry" v1="Organic " v2="Calcualtion" v3="sound" p1={p01} />
        <Insidepart s1="Physics" v1="pdf" v2="brr" v3="adas" p2={p02} />
      </div>
      <Footer />
    </div>
  );
};

export default Library;
