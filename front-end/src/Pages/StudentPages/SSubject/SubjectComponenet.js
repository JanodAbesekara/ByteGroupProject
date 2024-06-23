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
          borderRadius: "3px",
          backgroundColor: "#F0F8FF",
          width:"auto",
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <p style={{ textAlign:"center",
                    marginBottom: "15px",
                    fontSize: "20px",
                    fontWeight: "400",
                    padding: "3px 8px",                    
                    color: "#fff",
                    backgroundColor: "#27ae60",
                    borderRadius: "4px",
                    marginLeft:"15px",
                    marginRight:"15px",

      }}>{subject}  <span style={{fontSize:"13px",color:"#f9f9f9"}}>({medium})</span></p>
      <div style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
      }}>
      <div style={{display:"flex", flexDirection:"column", width:"auto"}}>
        <div style={{ marginLeft: "20px", marginTop: "0px" }}>
          <Component1
            teachermail={teachermail}
            subject={subject}
            Feedmedium={medium}
          />
        </div>
        <div style={{ marginLeft: "20px", display:"flex"}}>
        <Content
          teachermail={teachermail}
          subject={subject}
          medium={medium}
        /></div>
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
    </div>
  );
}

export default SubjectComponenet;
