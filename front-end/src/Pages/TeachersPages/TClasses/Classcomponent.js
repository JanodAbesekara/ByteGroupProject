import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Classcomponent({ subjectData }) {
  const [lectureCount, setLectureCount] = useState(0); // Initialize with 0
  const [fetchedData, setFetchedData] = useState(null); // Store fetched data
  const [editMode, setEditMode] = useState(false); // Track edit mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        const response = await axios.get(`/api/user/teacherattendence`);
        const filteredData = response.data.data.filter(
          (item) =>
            item.subject === subjectData.subject &&
            item.teacheremail === userEmail &&
            item.media === subjectData.medium
        );
        setFetchedData(filteredData[0] || null); // Use first item or null for clarity
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subjectData.subject, subjectData.medium]); // Dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      leccount: lectureCount,
      teacheremail: jwtDecode(localStorage.getItem("MERN_AUTH_TOKEN")).email, // Safer access
      subject: subjectData.subject,
      media: subjectData.medium,
    };

    try {
      const existingLecture = fetchedData; // Use fetchedData for editing
      let response;

      if (existingLecture) {
        response = await axios.post(`/api/user/editlecturecount`, data);
      } else {
        response = await axios.post(`/api/user/teacherlecture`, data);
      }

      // Update local state and display success message
      setFetchedData(response.data); // Assuming data contains lecture info
      window.alert(response.data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true); // Switch to edit mode
    setLectureCount(fetchedData?.leccount || 0); // Set initial value for edit
  };

  return (
    <>
      <div style={{ justifyContent: "center", alignContent: "center", display: "flex", marginBottom: "50px", marginTop: "50px" }}>
        <div className="classcom" style={{ width: "95%", border: "2px solid black" }}>
          <Link to="/ClassContent">
            <h2 style={{ width: "100%", backgroundColor: "darkblue", textAlign: "center", padding: "10px 0px" }}>
              {subjectData.subject}
            </h2>
          </Link>
          <h4>{subjectData.medium}</h4>
          <div>
            <h2>Lecture count</h2>
            <form onSubmit={handleSubmit}>
              <input type="number" value={lectureCount} onChange={(e) => setLectureCount(e.target.value)} />
              <button type="submit">{editMode ? "Update" : "Submit"}</button>
            </form>
            <div style={{ float: "right", marginRight: "50px" }}>
              {fetchedData && ( // Conditionally render details
                <div>
                  <h4>Subject: {fetchedData.subject}</h4>
                  <h4>Media: {fetchedData.media}</h4>
                  <h4>Lecture Count: {fetchedData.leccount}</h4>
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Classcomponent;
