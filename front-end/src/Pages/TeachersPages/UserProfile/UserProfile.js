import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode"; // Adjust the import for jwt-decode
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";

function UserProfile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState("");
  const fileInputRef = useRef(null);

  const [medium, setMedium] = useState("");
  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [showChooseOption, setShowChooseOption] = useState(true); // control visibility
  const [showScheme, setShowScheme] = useState(true); // control visibility
  const [subjectOption, setSubjectOption] = useState(true); // control visibility
  const [scheme, setScheme] = useState(""); // control visibility of "choose scheme"
  const [classpees, setClasspees] = useState(""); // control visibility of "choose scheme"
  const [clicked, setClicked] = useState(true); //control profile picture uploding button

  // Function to handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    const checkImageExists = async () => {
      const imageRef = ref(storage, `teacherProfile/${userID}/profile_pic`);
      try {
        const imageUrl = await getDownloadURL(imageRef);
        setUrl(imageUrl);
      } catch (error) {
        console.log("Error checking image existence:", error.message);
      }
    };

    checkImageExists();
  }, []);

  const handleSave = () => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;
    const imageRef = ref(storage, `teacherProfile/${userID}/profile_pic`);

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            window.alert("Image uploaded successfully!");
          })
          .catch((error) => {
            console.log(error.message, "error getting image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setClicked(true);
  };

  useEffect(() => {
    let userID;

    if (localStorage.getItem("MERN_AUTH_TOKEN")) {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      userID = decodedToken._id;
    } else {
      userID = "";
    }

    axios
      .get(`api/user/userProfile/${userID}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      window.alert("Please add profile picture first");
    } else {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const userID = decodedToken._id;
      const userEmail = decodedToken.email;
      setUser(decodedToken);

      const validateForm = () => {
        if (!medium || !scheme || !degree || !experience || !aboutme) {
          if (!medium) {
            window.alert("You must select your medium");
            return;
          }
          if (isNaN(classpees) || classpees < 0 || classpees === "") {
            window.alert(
              "Class fees must be a positive number and cannot be empty"
            );
            return;
          }
          if (!scheme) {
            window.alert("You must select your scheme");
            return;
          }
          if (!degree) {
            window.alert("You must select your degree");
            return;
          }
          if (!experience) {
            window.alert("You must select your experience");
            return;
          }
          if (!aboutme) {
            window.alert("You must select your aboutme");
            return;
          }

          window.alert("Please fill all the required fields");
          return; // Return false to indicate form validation failed
        }
        return true; // Return true to indicate form validation passed
      };

      if (validateForm) {
        const updatedUser = {
          ...user,
          medium: medium,
          scheme: scheme,
          subject: subject,
          degree: degree,
          experience: experience,
          aboutme: aboutme,
          email: userEmail,
          id: userID,
          url: url,
          classpees: classpees,
        };

        console.log(updatedUser);
        axios
          .post(`/api/user/userProfile`, updatedUser)
          .then((response) => {
            window.alert(response.data.msg);
            console.log(response.data.msg);
            window.location.reload();
          })
          .catch((error) => {
            window.alert(error.response.data.msg);
            console.log(error.response.data.msg);
          });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="head">
        <div className="container2">
          <Sidebar />
        </div>
        <div className="container3" style={{ paddingRight: "20px" }}>
          <div className="container1">
            <div className="profile_pic">
              <div className="picture">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <Avatar
                  alt="profile_pic"
                  src={url}
                  sx={{ width: 90, height: 90 }}
                />
                {clicked ? (
                  <button
                    onClick={() => {
                      fileInputRef.current.click();
                      setClicked(!clicked);
                    }}
                    style={{
                      backgroundColor: "#39a0ca",
                      boxShadow: "0 1.5px 5px #2d2d2d",
                      border: "none",
                    }}
                  >
                    Change
                  </button>
                ) : (
                  <button onClick={handleSave}>Save</button>
                )}
              </div>
            </div>
            <div className="teacher_info">
              <div className="name">
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
            </div>
          </div>

          <div className="personal_details">
            <div className="details">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                }}
              >
                <label htmlFor="medium">
                  <span style={{ color: "red" }}>*</span>Medium
                </label>
                <br />
                <select
                  style={{
                    height: "36px",
                    width: "auto",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
                    width: "auto",
                    display: "flex",
                  }}
                  onChange={(e) => {
                    setShowScheme(false);
                    setMedium(e.target.value);
                  }}
                >
                  {showScheme && (
                    <option value="Choose your scheme">
                      Choose your Medium
                    </option>
                  )}
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                </select>
                <br />
                <br />

                <label htmlFor="scheme">
                  <span style={{ color: "red" }}>*</span>Scheme
                </label>
                <br />
                <select
                  style={{
                    height: "36px",
                    width: "auto",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
                    width: "auto",
                    display: "flex",
                  }}
                  onChange={(e) => {
                    setScheme(e.target.value);
                    setShowChooseOption(false);
                  }}
                >
                  {showChooseOption && (
                    <option value="Choose your scheme">
                      Choose your Scheme
                    </option>
                  )}
                  <option value="Grade 5">Grade 5</option>
                  <option value="Ordinary Level">Ordinary Level</option>
                  <option value="Advanced Level">Advanced Level</option>
                </select>
                <br />
                <br />

                <label htmlFor="subject">
                  <span style={{ color: "red" }}>*</span>Subject
                </label>
                <br></br>
                <select
                  style={{
                    height: "36px",
                    width: "auto",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
                    width: "auto",
                    display: "flex",
                  }}
                  onChange={(e) => {
                    setSubjectOption(false);
                    setSubject(e.target.value);
                  }}
                >
                  {scheme === "Grade 5" && (
                    <>
                      {subjectOption && (
                        <option value="Choose your scheme">Choose</option>
                      )}
                      <option value="Grade 5">Grade 5</option>
                    </>
                  )}

                  {scheme === "Ordinary Level" && (
                    <>
                      {subjectOption && (
                        <option value="Choose your scheme">
                          Choose your Subject
                        </option>
                      )}
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Music">Music</option>
                      <option value="Geography">Geography</option>
                      <option value="Health Studies">Health Studies</option>
                      <option value="Arts">Arts</option>
                      <option value="IT">IT</option>
                      <option value="Civic">Civic</option>
                    </>
                  )}

                  {scheme === "Advanced Level" && (
                    <>
                      {subjectOption && (
                        <option value="Choose your scheme">
                          Choose your Subject
                        </option>
                      )}
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Combined Maths">Combined Maths</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Bio System Technology">
                        Bio System Technology
                      </option>
                      <option value="Engineering Technology">
                        Engineering Technology
                      </option>
                      <option value="Science for Technology">
                        Science for Technology
                      </option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Political Science">
                        Political Science
                      </option>
                      <option value="Buddhism Culture">Buddhism Culture</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="Media">Media</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Hindi">Hindi</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                    </>
                  )}
                </select>
                <br />

                <br></br>
                <label htmlFor="degree">
                  <span style={{ color: "red" }}>*</span>Degree
                </label>
                <br></br>
                <input
                  type="text"
                  className="degree"
                  placeholder="Enter here"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  style={{ width: "auto", display: "flex" }}
                ></input>
                <br></br>
                <label htmlFor="experience">
                  <span style={{ color: "red" }}>*</span>Experience
                </label>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="Enter here"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  style={{ width: "auto", display: "flex" }}
                ></input>
                <br></br>
                <label htmlFor="experience">
                  <span style={{ color: "red" }}>*</span>Class fees
                </label>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="Enter here"
                  value={classpees}
                  onChange={(e) => setClasspees(e.target.value)}
                  style={{ width: "auto", display: "flex" }}
                ></input>
                <br></br>
                <label htmlFor="aboutMe">
                  <span style={{ color: "red" }}>*</span>About me
                </label>
                <br></br>
                <textarea
                  type="text"
                  className="about"
                  placeholder="Add something about yourself"
                  value={aboutme}
                  onChange={(e) => setAboutMe(e.target.value)}
                  style={{
                    padding: "0",
                    margin: "0",
                    width: "auto",
                    display: "flex",
                  }}
                ></textarea>

                <div className="btn-2">
                  <button
                    type="submit"
                    value="saveDetails"
                    style={{
                      backgroundColor: "#39a0ca",
                      boxShadow: "0 1.5px 5px #2d2d2d",
                      border: "none",
                    }}
                  >
                    Save
                  </button>
                  <br />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
