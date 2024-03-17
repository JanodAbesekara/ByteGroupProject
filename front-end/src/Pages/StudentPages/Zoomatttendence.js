import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Zoomatttendence() {
    const [isChecked, setIsChecked] = useState(false);
    const [lectureStartTime, setLectureStartTime] = useState(new Date('2024-03-15T09:00:00')); // Example start time
    const [lectureEndTime, setLectureEndTime] = useState(new Date('2024-03-15T10:05:00')); // Example end time

    useEffect(() => {
        const lectureStart = new Date(lectureStartTime);
        const lectureEnd = new Date(lectureEndTime);

        const randomTime = new Date(lectureStart.getTime() + Math.random() * (lectureEnd.getTime() - lectureStart.getTime()));

        const timeoutId = setTimeout(() => {
            setIsChecked(true);
        }, randomTime - Date.now());

        return () => clearTimeout(timeoutId);
    }, [lectureStartTime, lectureEndTime]);

    const handleAttendance = async () => {
        try {
            const token = localStorage.getItem('MERN_AUTH_TOKEN');
            const decodedToken = jwtDecode(token);
            const studentEmail = decodedToken.email;
            await axios.post('/api/markAttendance', { studentEmail });
            setIsChecked(true);
        } catch (error) {
            console.error('Error marking attendance:', error.message);
        }
    };

    return (
        <div>
            {!isChecked ? (
                <div>
                    <p>Click the checkbox to mark attendance</p>
                    <input type="checkbox" onChange={handleAttendance} />
                </div>
            ) : (
                <p>Attendance marked!</p>
            )}
        </div>
    );
}

export default Zoomatttendence;
