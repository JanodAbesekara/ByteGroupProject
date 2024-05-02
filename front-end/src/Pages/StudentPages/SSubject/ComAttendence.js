import React,{useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function ComAttendence() {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const firstname = decodedToken.firstname; 
     const lastname = decodedToken.lastname;


     const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setButtonDisabled(true);
        try {
            const response = await axios.post('/api/user/studentattendence', {
                studentnemail: decodedToken.email,
                studentname: firstname + " " + lastname,
                subject: "chemistry",
                teachetmail: "janodabesekara@gmail.com",
            });
            window.alert(response.data.msg);
        } catch (error) {
            window.alert(error.response.data.msg);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <button type="submit" disabled={buttonDisabled}>Mark Attendance</button>
            </form>
        </div>
    );
}

export default ComAttendence;
