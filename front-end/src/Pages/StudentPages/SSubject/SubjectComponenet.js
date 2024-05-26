import React from "react";
import DisplayAttendence from "./DisplayAttendence";
import Component1 from "./Component1";
import Content from "./Content";

function SubjectComponenet({ teachermail, subject, medium }) {



  return (
    <div>
      <div
        style={{
          width: "99%",
          marginright: "5px",
          marginRight: "10px",
          marginBottom: "80px",
          paddingTop: "2px",
          borderRadius: "20px",
          backgroundColor: "#B9D9EB",
        }}
      >
        <h1>{subject}</h1>
        <h3>{teachermail}</h3>
        <h3>{medium}</h3>
        <div style={{ marginLeft: "80%" }}>
          <DisplayAttendence
            teachermail={teachermail}
            subject={subject}
            medium={medium}
          />
        </div>
        <div style={{ marginLeft: "20px", marginTop: "-150px" }}>
          <Component1
            teachermail={teachermail}
            subject={subject}
            Feedmedium={medium}
          />
        </div>
        <Content
          teachermail={teachermail}
          subject={subject}
          medium={medium}
        />
      </div>
    </div>
  );
}

export default SubjectComponenet;
