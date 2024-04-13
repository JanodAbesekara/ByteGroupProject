import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function DisplayAttendence() {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);


    const [displayData1, setDisplayData1] = useState([]);
    const [displayData2, setDisplayData2] = useState([]);
    let filterData1 = [];
    let filterData2 = [];

    useEffect(() => {
        const fetchAttendance = () => {
            axios.get(`/api/user/techeralectureget`)
                .then(res => {
                    const fildata1 = res.data.data;
                    filterData1 = fildata1.filter((item) => item.subject === "Business Studies" && item.teacheremail === "janodabesekara91@gmail.com");
                    setDisplayData1(filterData1);
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
                    filterData2 = fildata2.filter((item) => item.subject === "Business Studies" && item.studentnemail === decodedToken.email);
                    setDisplayData2(filterData2);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchStudentAttendance();
    }, []);

    // Calculate attendance percentage here
    const attendancePercentage = filterData2.countAttendence / filterData1.leccount * 100 || 0;

    return (
        <div>
            <h2>The percentage: {attendancePercentage}%</h2>
        </div>
    );
}

export default DisplayAttendence;
