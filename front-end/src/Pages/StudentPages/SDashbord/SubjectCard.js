import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileDisplay from "./ProfileDisplay";

export default function SubjectCard() {
  const [Subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/Enrol/getSubject", {
          params: { userEmail: userEmail },
        });

        const filteredSubjects = response.data.data;

        setSubjects(filteredSubjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchSubjects();
  }, []);

  console.log(Subjects);

  return (
    <div>
      <div>
        {Subjects
        .slice(0)
        .reverse()
        .map((subject) => (
          <div
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
            key={subject._id}
          >
            <div
              style={{
                alignContent: "center",
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
                marginTop: "20px",
                backgroundColor: "#d5edd6",
                border: "none",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  className="classcom"
                  style={{ width: "40%", border: "none" }}
                >
                  <Link
                    to="/SSubject"
                    style={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    <p
                      style={{
                        display:"flex",
                        width: "100%",
                        backgroundColor: "#1A8FE3",
                        textAlign: "center",
                        padding: "5px 3px",
                        color: "#fff",
                        margin: "0px",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {subject.Ensubject}
                    </p>
                  </Link>
                </div>
                <div style={{ paddingLeft: "10px", paddingTop: "2px" }}>
                  <p
                    style={{
                      margin: "4px 0px",
                      color: "#F37933",
                      fontWeight: "600",
                      marginRight: "10px",
                    }}
                  >
                    {subject.Enmedium}
                  </p>
                </div>
              </div>
              <ProfileDisplay email={subject.teacherEmail} subject={subject.Ensubject} medium={subject.Enmedium}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
