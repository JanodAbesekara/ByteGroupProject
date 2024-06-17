import React, { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import InputTimerange from "./InputTimerange";
import EnterAssignment from "./EnterAssignment";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function CombinedComponent({ medium, subject }) {
  const [timeRange, setTimeRange] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let userEmail;
    if (localStorage.getItem("MERN_AUTH_TOKEN")) {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      userEmail = decodedToken.email;
    } else {
      userEmail = " ";
    }

    sentnotifsacition();

    const assignmentDetails = {
      TeacherEmail: userEmail,
      TeacherSubject: subject,
      question: questions,
      TimeRanges: timeRange,
      submedium: medium,
    };

    console.log(assignmentDetails);
    console.log(subject);
    const request = axios.post(
      `/api/assignment/createAssignment`,
      assignmentDetails
    );
    request.then((response) => {
      console.log("Response:", response);
      window.alert(response.data.message);
      window.location.reload(); // refresh the window
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
        titleofAnn: `Assignment Avilable for you`,
        Announcementmessage: "You have new Assignment to solve",
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
          margin: "100px 30px",
          boxShadow: "2px 2px 10px 2px #888888",
          borderRadius: "5px",
          padding: "20px",
          paddingBottom: "50px",
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
            <InputTimerange setTimeRange={setTimeRange} />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <EnterAssignment setQuestions={setQuestions} />
          </div>
          <button
            type="submit"
            style={{
              marginTop: "18px",
              backgroundColor: "#666967",
              color: "white",
              border: "1px solid gray",
              borderRadius: "5px",
              padding: "3px",
              boxShadow: "1px 1px 3px 1px #1a1c1b",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
