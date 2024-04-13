import React from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function ComAttendence() {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const firstname = decodedToken.firstname; 
     const lastname = decodedToken.lastname;


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/studentattendence', {
                studentnemail: decodedToken.email,
                studentname: firstname + " " + lastname,
                subject: "Business Studies",
                teachetmail: "janodabesekara@gmail.com",
            });
            window.alert(response.data.msg);
        } catch (error) {
            window.alert(error.response.data.msg);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Mark Attendance</button>
            </form>
        </div>
    );
}

export default ComAttendence;
