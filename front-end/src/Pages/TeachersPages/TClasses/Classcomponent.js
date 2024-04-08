import React from "react";
import { Link } from "react-router-dom";
import ClasstimesetCom from "./ClasstimesetCom";

function Classcomponent({ selectsubject }) {
  return (
    <>
      {selectsubject.map((subject) => (
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            marginBottom: "50px",
            marginTop: "50px",
          }}
          key={subject.id}
        >
            
          <div
            
            className="classcom"
            style={{ width: "95%", border: "2px solid black" }}
          >
            <Link to="/ClassContent">
            <h2
              style={{
                width: "100%",
                backgroundColor: "darkblue",
                textAlign: "center",
                padding: "10px 0px",
              }}
            >
              {subject.subjectname}
            </h2>
            <h4>{subject.mediem}</h4>
            <subject />
            </Link>
            <ClasstimesetCom />

          </div>
        </div>
      ))}
    </>
  );
}

export default Classcomponent;
