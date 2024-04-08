import React from 'react'
import { CgSoftwareUpload } from "react-icons/cg";
import { Link } from "react-router-dom";

function Setquise({ div }) {
 

  return (
    <div>
      {div.map((item, index) => (
        <div className="Quibox" key={index}>
          <h2>{item.Subject}</h2>
          <h3>Data : {item.Date}</h3>
          <h4>Time limit : {item.time}</h4>
          <button >
            <CgSoftwareUpload />
          </button>

          <Link to="/Enterquizes">
            <button
              style={{ padding: "5px", textAlign: "center", fontSize: "14px" }}
            >
              SelectQuises
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Setquise;
