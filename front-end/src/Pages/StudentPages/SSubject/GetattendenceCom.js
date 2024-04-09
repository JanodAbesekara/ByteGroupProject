import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function GetattendanceCom() {
  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  const [attendanceCount, setAttendanceCount] = useState(0);
  const [leccount, setLeccount] = useState(0);
  const [Tmail, setTmail] = useState("");
  const [mark, setMark] = useState(0);

  useEffect(() => {
    try {
      axios
        .get(`/api/user/teacherattendence`)
        .then((response) => {
          const filteredData =
            response?.data?.data.filter(
              (item) => item.subject === "Business Studies"
            ) || [];
          const attendance = filteredData[0];
          setAttendanceCount(attendance?.attendanceCount);
          setLeccount(attendance?.leccount);
          setTmail(attendance?.Tmail);
          setMark(attendance?.mark);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const percentage = calculatePercentage(mark);
    const details = {
      leccount: leccount,
      attendanceCount: attendanceCount,
      userEmail: userEmail,
      Tmail: Tmail,
      subject: "Business Studies",
      mark: mark,
      percentage: percentage,
    };

    try {
      await axios.post(`/api/user/teacherattendance`, details);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const calculatePercentage = (count) => {
    const totalDays = leccount;
    return ((mark / totalDays) * 100);
  };

  const increase = () => {
    setMark(mark + 1);
    console.log(mark);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={increase}>
          Add Attendance
        </button>
        <h4> Display attendance : {calculatePercentage(mark)}%</h4>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GetattendanceCom;
