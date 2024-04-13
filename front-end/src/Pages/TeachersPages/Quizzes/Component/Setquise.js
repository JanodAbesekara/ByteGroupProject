import React, { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import InputTimerange from "./InputTimerange";
import Enterquizes from "./Enterquizes";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function CombinedComponent() {
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
      TeacherSubject:"Business Studies",
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
      <form onSubmit={handleSubmit}>
        <InputTimerange
          setTimeRange={setTimeRange}
          setQuizNumber={setQuizNumber}
        />
        <Enterquizes setQuestions={setQuestions} />
        <button type="submit">
          {" "}
          <CgSoftwareUpload />
          Submit
        </button>
      </form>
    </div>
  );
}
