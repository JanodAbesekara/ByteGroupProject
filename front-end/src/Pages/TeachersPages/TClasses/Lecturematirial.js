import React, { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Lecturematirial() {
  const [leccount, setlectcount] = useState(" ");
  const [subject, setSubjectp] = useState(" ");
  const [time, settime] = useState(" ");
  const [data, setdata] = useState(" ");


  useEffect(() => {
    try {
      axios.post(`/api/user/teacherlecture`, data).then((response) => {
        window.alert(response.data.msg);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leccount);
  setlectcount(" ");
  setSubjectp(" ");
  settime(" ");
    setdata({
      leccount: leccount,
      subject: subject,
      time: time,
      teacheremail: userEmail,
    });
  };



  return (
    <div>
      <div>
        <h2>Lecture count</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={leccount}
            onChange={(e) => setlectcount(e.target.value)}
          />
          <h4>lecture time</h4>
        <select
         name="class"
         className="select"
         onChange={(e) => settime(Number(e.target.value))}
        >    
            <option value=" ">lecture time</option>
            <option value={30}>30 mints</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hour</option>
            <option value={120}>2 hour</option>
        </select>
          <h3>Subject</h3>
          <select
            name="class"
            className="select"
            onChange={(e) => setSubjectp(e.target.value)}
          >
            <option value=" ">subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Agriculture">Agriculture</option>
            <option value="English Literature">English Literature</option>
            <option value="English">English</option>
            <option value="ICT">ICT</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Combined Mathematics">Combined Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Biology">Biologye</option>
            <option value="Business Studies">Business Studies</option>
            <option value="Accounting">Accounting</option>
            <option value="Economics">Economics</option>
            <option value="Logic and Scientific Method">
              Logic and Scientific Method
            </option>
            <option value="Political Science">Political Science</option>
            <option value="Engineering Technology">
              Engineering Technology
            </option>
            <option value="Bio Systems Technology">
              Bio Systems Technology
            </option>
            <option value="Science for Technology">
              Science for Technology
            </option>
            <option value="Grade_5">Grade 5</option>
          </select>

          <button type="submit">Submit</button>
          <button>Edit</button>
        </form>
      </div>
    </div>
  );
}

export default Lecturematirial;
