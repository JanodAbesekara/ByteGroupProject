import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ClassCard(subjectData) {
  const [editedData, setEditedData] = useState({
    degree: subjectData.subjectData.degree,
    experience: subjectData.subjectData.experience,
    aboutme: subjectData.subjectData.aboutme,
    classpees: subjectData.subjectData.classpees,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [subID, setSubID] = useState("");

  const handleEdit = () => {
    const id = subjectData.subjectData._id;
    setSubID(id);
    setIsEditing(true);
   
  };

  const handleSave = () => {
    // Save edited data to the backend
    setIsEditing(false);

    const updatedData = {
      degree: editedData.degree,
      experience: editedData.experience,
      aboutme: editedData.aboutme,
      classpees: editedData.classpees,
    };

    axios
      .put(`/api/user/update/${subID}`, updatedData)
      .then((response) => {
        window.alert(response.data.msg);
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.response.data.msg);
       
      });
  };

  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want ot delete the subject?"
    );

    if (confirmation) {
      const id = subjectData.subjectData._id;
      axios
        .delete(`/api/user/delete/${id}`)
        .then((response) => {
          window.alert(response.data.msg);
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error.response.data.msg);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  return (
    <div>
      <div
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            marginTop: "20px",
            backgroundColor: "#F0F8FF",
            border: "none",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          <div>
            <div className="classcom">
              <Link
                to="/TClasses"
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <p
                  style={{
                    width: "auto",
                    backgroundColor: "#27ae60",
                    textAlign: "center",
                    padding: "5px 1px",
                    color: "#fff",
                    margin: "0px",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {subjectData.subjectData.subject}{" "}
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    ({subjectData.subjectData.medium})
                  </span>
                </p>
              </Link>
            </div>
            {/* <div style={{ paddingLeft: "10px", paddingTop: "3px" }}>
              <p
                style={{
                  margin: "4px 0px",
                  color: "#F37933",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                
              </p>
            </div> */}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ color: "#2a28a6", fontWeight: "700", width: "88%" }}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="degree"
                    value={editedData.degree}
                    onChange={handleInputChange}
                    style={{
                      margin: "4px 6px",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  />
                  <input
                    type="text"
                    name="experience"
                    value={editedData.experience}
                    onChange={handleInputChange}
                    style={{
                      margin: "4px 6px",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  />
                  <input
                    type="text"
                    name="aboutme"
                    value={editedData.aboutme}
                    onChange={handleInputChange}
                    style={{
                      margin: "4px 6px",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  />
                  <input
                    type="text"
                    name="classpees"
                    value={editedData.classpees}
                    onChange={handleInputChange}
                    style={{
                      margin: "4px 6px",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  />
                </>
              ) : (
                <>
                  <p style={{ margin: "4px 6px", fontSize: "13px" }}>
                    {editedData.degree}
                  </p>
                  <p style={{ margin: "4px 6px", fontSize: "13px" }}>
                    {editedData.experience}
                  </p>
                  <p style={{ margin: "4px 6px", fontSize: "13px" }}>
                    Rs.{editedData.classpees}.00
                  </p>
                  <p
                    style={{
                      margin: "4px 6px",
                      fontSize: "13px",
                      fontStyle: "italic",
                      color: "#746D69",
                      fontWeight: "500",
                    }}
                  >
                    {editedData.aboutme}
                  </p>
                </>
              )}
            </div>
            <div
              style={{
                width: "auto",
                display: "flex",
                flexDirection: "column",
                paddingRight: "5px",
              }}
            >
              {isEditing ? (
                <button
                  style={{
                    margin: "5px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: "3px 0px",
                  }}
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  style={{
                    margin: "5px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#999999",
                    color: "#fff",
                    padding: "2px 3px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                style={{
                  margin: "5px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "red",
                  color: "#fff",
                  padding: "2px 3px",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
