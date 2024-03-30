import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Lecturematirial() {
  const [leccount, setlectcount] = useState("");
  const [subject, setSubject] = useState("");
  const [time, settime] = useState("");
  const [newvalue, setNewvalue] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/teacherattendence`)
      .then((response) => {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        const filteredData =
          response?.data?.data.filter(
            (item) =>
              item.subject === "Business Studies" &&
              item.teacheremail === userEmail
          ) || [];
        setNewvalue(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const data = {
      leccount: leccount,
      subject: subject,
      time: time,
      teacheremail: userEmail,
    };

    try {
      const existingLecture = newvalue.find(
        (lecture) =>
          lecture.subject === subject && lecture.teacheremail === userEmail
      );
      let response;

      if (existingLecture) {
        response = await axios.post(`/api/user/editlecturecount`, data);
      } else {
        response = await axios.post(`/api/user/teacherlecture`, data);
      }

      window.alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (lecture) => {
    setlectcount(lecture.leccount);
    setSubject(lecture.subject);
    settime(lecture.time);
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
            value={time}
            onChange={(e) => settime(e.target.value)}
          >
            <option value="">lecture time</option>
            <option value="30">30 mints</option>
            <option value="1">1 hour</option>
            <option value="1.5">1.5 hour</option>
            <option value="2">2 hour</option>
          </select>
          <h3>Subject</h3>
          <select
            name="class"
            className="select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">subject</option>
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
        </form>
      </div>

      <div style={{ float: "right", marginRight: "50px" }}>
        {newvalue.map((lecture) => (
          <div>
            <h4>Subject: {lecture.subject}</h4>
            <h4>
              Time: {lecture.time}{" "}
              {lecture.time === 30 ? "Minutes" : "Hours"}
            </h4>

            <h4>Lecture Count: {lecture.leccount}</h4>

            <button onClick={() => handleEdit(lecture)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lecturematirial;
