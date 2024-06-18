import React, { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import InputTimerange from "./InputTimerange";
import Enterquizes from "./Enterquizes";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function CombinedComponent({ medium, subject }) {
  const [timeRange, setTimeRange] = useState("");
  const [quizNumber, setQuizNumber] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;
    sentnotifsacition();


    const payload = {
      TimeRanges: timeRange,
      QuizeNumber: quizNumber,
      question: questions,
      TeacherEmail: useremail,
      TeacherSubject: subject,
      submedium: medium,
    };

    const request = axios.post(`/api/Quise/createQuise`, payload);
    request.then((response) => {
      window.alert(response.data.message);
      window.location.reload();
    });
    request.catch((error) => {
      console.error("Error:", error);
      window.alert(error.response.data.message);
    });
  };

  const sentnotifsacition = async (e) => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const useremail = decodedToken.email;
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const paylod = {
        titleofAnn: `New Quise Number ${quizNumber} `,
        Announcementmessage: "You have new Quise to solve",
        postedemail: useremail,
        TeacheSubject: subject,
        mediua: medium,
        date: currentDate.toISOString().split("T")[0],
        time: currentTime,
        jobrole: "Lecturer",
      };

      const response = await axios.post(`/api/send/notifaction`, paylod);
      console.log(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred while sending the notification");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          marginRight: "20px",
          marginLeft: "20px",
          boxShadow: "2px 2px 10px 2px #888888",
          borderRadius: "5px",
          padding: "20px",
          marginTop: "100px",
          paddingBottom: "50px",
          marginBottom: "100px",
          backgroundColor: "#eef2ed",
        }}
      >
        <h2
          style={{
            textTransform: "uppercase",
            color: "#2439bf",
            fontSize: "25px",
          }}
        >
          {subject}
        </h2>


        <h2
          style={{
            fontSize: "15px",
            paddingTop: "4px",
            fontWeight: "bold",
            color: "#0e5e5a",
            marginBottom: "10px",
          }}
        >
          {medium}
        </h2>

        <hr />

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <InputTimerange
              setTimeRange={setTimeRange}
              setQuizNumber={setQuizNumber}
            />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Enterquizes setQuestions={setQuestions} />
          </div>
          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "5px 30px",
              boxShadow: "2px 2px 10px 2px #888888",
              border: "none",
              borderRadius: "5px",
              fontSize: "20px",
              marginLeft: "50px",
              display: "flex",
              width: "auto",
            }}
          >
            {" "}
            <CgSoftwareUpload />
          </button>
        </form>
      </div>
    </div>
  );
}
