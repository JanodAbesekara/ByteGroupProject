import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileDisplay({ teacherEmail }) {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get("/api/Test/profileget", {
          params: { email: teacherEmail },
        });
        setTeacher(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTeacher();
  }, [teacherEmail]);

  const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  return (
    <div>
      {teacher && (
        <Link to={teacher.url || defaultImage}>
          <img
            src={teacher.url || defaultImage}
            alt="Profile"
            style={{ borderRadius: "100%", width: "50px", height: "50px" }}
          />
        </Link>
      )}
    </div>
  );
}

export default ProfileDisplay;
