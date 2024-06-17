import React from "react";
import DisplayAttendence from "./DisplayAttendence";
import Component1 from "./Component1";
import Content from "./Content";

function SubjectComponenet({ teachermail, subject, medium }) {



  return (
    <div>
      <div
        style={{
          
          marginLeft: "15px",
          marginRight: "10px",
          marginBottom: "100px",
          paddingBlock:"20px",
          borderRadius: "20px",
          backgroundColor: "#B9D9EB",
          
        }}
      >
        <p style={{ textAlign:"center",
                    marginBottom: "15px",
                    fontSize: "30px",
                    fontWeight: "700",
                    fontFamily:"Teko, sans-serif",
                    color: "rgb(12, 78, 139)",
                    wordSpacing: "5px",
                    letterSpacing: "2px"

      }}>{subject}  <span style={{fontSize:"18px",color:"#fd7e14"}}>({medium})</span></p>
      <div style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
      }}>
      <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{ marginLeft: "20px", marginTop: "0px" }}>
          <Component1
            teachermail={teachermail}
            subject={subject}
            Feedmedium={medium}
          />
        </div>
        <div style={{ marginLeft: "20px"}}>
        <Content
          teachermail={teachermail}
          subject={subject}
          medium={medium}
        /></div>
        </div>
        <div>
          <DisplayAttendence
            teachermail={teachermail}
            subject={subject}
            medium={medium}
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default SubjectComponenet;
