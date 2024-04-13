import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'; // Correct import

function DisplayAttendence() {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;

    const [displayData1, setDisplayData1] = useState([]);
    const [displayData2, setDisplayData2] = useState([]);

    useEffect(() => {
        const fetchAttendance = () => {
            axios.get(`/api/user/techeralectureget`)
                .then(res => {
                    const fildata1 = res.data.data;
                    const filteredData1 = fildata1.filter((item) => item.subject === "Business Studies" && item.teacheremail === "janodabesekara91@gmail.com");
                    setDisplayData1(filteredData1);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchAttendance();

        const fetchStudentAttendance = () => {
            axios.get(`/api/user/studenceattendenceget`)
                .then(res => {
                    const fildata2 = res.data.data;
                    const filteredData2 = fildata2.filter((item) => item.subject === "Business Studies" && item.studentnemail === useremail);
                    setDisplayData2(filteredData2);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchStudentAttendance();
    }, [useremail]);

    // Calculate attendance percentage here
    const attendancePercentage = displayData2.length > 0 && displayData1.length > 0 ? displayData2[0].countAttendence / displayData1[0].leccount * 100 : 0;

    return (
        <div>
            <h2>The percentage: {attendancePercentage}%</h2>
        </div>
    );
}

export default DisplayAttendence;
