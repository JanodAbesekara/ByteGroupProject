import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileDisplay({ email, subject, medium }) {
  const [teacher, setTeacher] = useState({});
  const [teacherProfile, setTeacherProfile] = useState({});
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get("/api/Test/profileget", {
          params: { email: email, subject: subject, medium: medium },
        });
        setTeacher(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTeacher();
  }, [email, subject, medium]);

  useEffect(() => {
    axios
      .get(`/api/user/name/${email}`)
      .then((response) => {
        setTeacherProfile(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  }, [email]);

  console.log(teacherProfile);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  return (
    <div>
      <div style={{ margin: "20px", padding: "10px", backgroundColor: "#fff" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ededeb",
            paddingTop: "5px",
            paddingLeft: "5px",
          }}
        >
          {teacher && (
            <Link to={teacher.profilePicUrl || defaultImage}>
              <img
                src={teacher.profilePicUrl || defaultImage}
                alt="Profile"
                style={{ borderRadius: "90%", width: "38px", height: "38px" }}
              />
            </Link>
          )}
          <p
            style={{
              paddingTop: "12px",
              paddingLeft: "5px",
              fontSize: "16px",
              fontWeight: "600",
              color: "blue",
            }}
          >
            {teacherProfile.firstname} {teacherProfile.lastname}
          </p>
        </div>
        <p style={{ color: "#fc2128", fontWeight: "600", fontSize: "14px" }}>
          {teacher.degree}
        </p>
        <p
          style={{
            fontStyle: "italic",
            color: "gray",
            fontSize: "14px",
            marginBottom: "4px",
          }}
        >
          {teacher.aboutme}
        </p>
        <a
          style={{
            textDecoration: "none",
            fontSize: "13px",
            backgroundColor: "#04c935",
            color: "#fff",
            padding: "2px",
            borderRadius: "5px",
            fontWeight: "600",
          }}
          href={`mailto:${teacherProfile.email}`}
        >
          Email Me
        </a>
      </div>
    </div>
  );
}

export default ProfileDisplay;
