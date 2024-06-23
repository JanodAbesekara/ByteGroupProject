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
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          borderRadius: "5px",
          padding: "20px",
          paddingBottom: "50px",
          backgroundColor: "#F0F8FF",
        }}
      >
        <p
          style={{
            color: "#fff",
            backgroundColor: "#27ae60",
            borderRadius: "5px",
            padding: "3px 8px",
            fontWeight:"500",
            fontSize:"20px"
          }}
        >
          {subject}
        </p>

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

        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"auto"}}>
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <InputTimerange setTimeRange={setTimeRange} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection:"column",
              width:"auto"
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
              width:"80px",
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
