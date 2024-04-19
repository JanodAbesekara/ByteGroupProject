import React, { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import InputTimerange from "./InputTimerange";
import Enterquizes from "./Enterquizes";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function CombinedComponent({medium , subject}) {
  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const useremail = decodedToken.email;

  const [timeRange, setTimeRange] = useState("");
  const [quizNumber, setQuizNumber] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Time Range:", timeRange);
    console.log("Quiz Number:", quizNumber);
    console.log("Questions:", questions);

    const payload = {
      TimeRanges: timeRange,
      QuizeNumber: quizNumber,
      question: questions,
      TeacherEmail: useremail,
      TeacherSubject:subject,
      submedium:  medium,
    };

  
    const request = axios.post(`/api/Quise/createQuise`, payload);
    request.then((response) => {
      console.log("Response:", response);
      window.alert(response.data.message);
      window.location.reload();
    });
    request.catch((error) => {
      console.error("Error:", error);
      window.alert(error.response.data.message);
    });
  };

  return (
    <div>
      <div
        style={{
          marginRight: "20px",
          boxShadow: "2px 2px 10px 2px #888888",
          padding: "20px",
          marginTop: "100px",
          paddingBottom: "50px",
          marginBottom: "100px",
        }}
      >
        <h2>{subject}</h2>
        <h2>{medium}</h2>
        
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
              justifyContent: "center",
              alignItems: "center",
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
