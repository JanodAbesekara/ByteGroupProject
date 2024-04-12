import React from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { Link } from "react-router-dom";
import InputTimerange from "./InputTimerange";

function Setquise() {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  
  };

  return (
    <div>
      <div className="Quibox">
        <form onSubmit={handleSubmit}>
          <InputTimerange />
          <button type="submit">
            <CgSoftwareUpload />
          </button>
          <Link to="/Enterquizes">
          <button
            style={{ padding: "5px", textAlign: "center", fontSize: "14px" }}
          >
            SelectQuises
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Setquise;
