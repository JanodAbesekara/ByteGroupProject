import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Correct import
import AttendenceChart from "./AttendanceChart";

function DisplayAttendence({ teachermail, subject, medium }) {

  let useremail;
  if( localStorage.getItem("MERN_AUTH_TOKEN")){
  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
   useremail = decodedToken.email;
  }else{
    useremail = " ";
  }
  const [displayData1, setDisplayData1] = useState([]);
  const [displayData2, setDisplayData2] = useState([]);

  const fetchAttendance = () => {
    axios
      .post(`/api/user/techeralectureget`, {
        teacheremail: teachermail,
        subject: subject,
        medium: medium,
      })
      .then((res) => {
        const filteredData1 = res.data.data;
        setDisplayData1(filteredData1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  fetchAttendance();

  const fetchStudentAttendance = () => {
    axios
      .get(`/api/user/studenceattendenceget`, {
        params: {
          teacheremail: teachermail,
          subject: subject,
          medium: medium,
          studentemail: useremail,
        }
      })
      .then((res) => {
        const filteredData2 = res.data.data;
        setDisplayData2(filteredData2);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  fetchStudentAttendance();

  // Calculate attendance percentage here
  const attendancePercentage =
    displayData2.length > 0 && displayData1.length > 0
      ? (displayData2[0].countAttendence / displayData1[0].leccount) * 100
      : 0;

  return (
    <div>
      <div style={{marginRight:"40px"}}>
        <AttendenceChart value={attendancePercentage} />
      </div>
    </div>
  );
}

export default DisplayAttendence;
