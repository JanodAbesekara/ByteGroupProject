import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ClassContent from "./ClassContent";

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

        const response = await axios.post(`/api/user/teacherattendence`, {
          teacheremail: userEmail,
          subject: subjectData.subject,
          media: subjectData.medium,
        });
        const filteredData = response.data.data;
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
      window.location.reload(); // Refresh page
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true); // Switch to edit mode
    setLectureCount(fetchedData?.leccount || 0); // Set initial value for edit
  };

  const [subjectDataState] = useState(subjectData);

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          flexDirection:"column",
          marginRight:"10px",
          marginBottom: "50px",
          marginTop: "50px",
          backgroundColor: "#F0F8FF",
          padding: "33px 20px",
          border: "none",
          borderRadius: "10px",
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <div className="classcom" style={{ width: "95%", border: "none" }}>
          <p
            style={{
              width: "100%",
              backgroundColor: "#27ae60",
              textAlign: "center",
              padding: "5px 2px",
              color: "#fff",
              margin: "4px 0px",
              border: "none",
              borderRadius: "7px",
              fontSize: "23px",
            }}
          >
            {subjectDataState.subject}
          </p>

          <p style={{ margin: "4px 0px", color: "#337ab7" }}>
            {subjectDataState.medium}
          </p>
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                color: "#594f4f",
                padding: "5px 0px",
              }}
            >
              <span style={{ color: "red" }}>*</span>Add Class Days Count
            </h2>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"auto"}}>
              <input
                style={{
                  margin: "3px 0px 10px",
                  padding: "3px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  width: "50px",
                }}
                type="number"
                value={lectureCount}
                onChange={(e) => setLectureCount(e.target.value)}
              />
              <br />
              <button
                style={{
                  color: "#fff",
                  padding: "3px",
                  backgroundColor: "#a4a6b3",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  width:"60px",
                  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
                type="submit"
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </form>

            <div style={{ float: "left", marginRight: "50px" }}>
              {fetchedData && ( // Conditionally render details
                <div>
                  <h4 style={{ padding: "10px 0px", color: "#594f4f" }}>
                    Class Day Count :{" "}
                    <span style={{ color: "#000" }}>
                      {fetchedData.leccount}
                    </span>
                  </h4>
                  <button
                    style={{
                      padding: "3px",
                      borderRadius: "5px",
                      backgroundColor: "#a4a6b3",
                      border: "1px solid gray",
                      color: "#fff",
                      width:"auto",
                      marginBottom:"8px",
                      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    }}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <ClassContent subjectData={subjectData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Classcomponent;
