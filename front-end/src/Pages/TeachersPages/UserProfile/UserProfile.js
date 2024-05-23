import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
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
  const [showChooseOption, setShowChooseOption] = useState(true); //control visibility
  const [showScheme, setShowScheme] = useState(true); //control visibility
  const [subjectOption, setSubjectOption] = useState(true); //control visibility
  const [scheme, setScheme] = useState(""); //control visibility of "choose scheme"

  // Function to handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
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
  };

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;
  // getting users name
  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

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
      setUser(decodedToken);

      const validateForm = () => {
        if (!medium || !scheme || !degree || !experience || !aboutme) {
          if (!medium) {
            window.alert("You must select your medium");
            return false;
          }
          if (!scheme) {
            window.alert("You must select your scheme");
            return false;
          }
          if (!degree) {
            window.alert("You must select your degree");
            return false;
          }
          if (!experience) {
            window.alert("You must select your experience");
            return false;
          }
          if (!aboutme) {
            window.alert("You must select your aboutme");
            return false;
          }
          return false; // Return false to indicate form validation failed
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
        };

        console.log(updatedUser);
        axios
          .post(`/api/user/userProfile`, updatedUser)
          .then((response) => {
            setMedium((pre) => (pre.length > 0 ? "" : pre));
            setScheme((pre) => (pre.length > 0 ? "" : pre));
            setSubject((pre) => (pre.length > 0 ? "" : pre));
            setDegree((pre) => (pre.length > 0 ? "" : pre));
            setExperience((pre) => (pre.length > 0 ? "" : pre));
            setAboutMe((pre) => (pre.length > 0 ? "" : pre));
            window.alert(response.data.msg);
            console.log(response.data.msg);
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
        <div className="container3">
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
                <button onClick={() => fileInputRef.current.click()}>
                  Change
                </button>
                <button onClick={handleSave}>Save</button>
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
              <form onSubmit={handleSubmit}>
                <lebel htmlFor="medium">
                  <span style={{ color: "red" }}>*</span>Medium
                </lebel>
                <br />
                <select
                  style={{
                    height: "36px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
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

                <lebel htmlFor="scheme">
                  <span style={{ color: "red" }}>*</span>Scheme
                </lebel>
                <br />
                <select
                  style={{
                    height: "36px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
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

                <lebel htmlFor="subject">
                  <span style={{ color: "red" }}>*</span>Subject
                </lebel>
                <br></br>
                <select
                  style={{
                    height: "36px",
                    width: "200px",
                    borderRadius: "5px",
                    border: "0.5px solid #10155b4d",
                    cursor: "pointer",
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
                      <option value="Heath Studies">Health Studies</option>
                      <option value="Arts">Arts</option>
                      <option value="IT">IT</option>
                      <option value="Civic">Civic</option>
                    </>
                  )}

                  {scheme === "Advanced Level" && (
                    <>
                      {subjectOption && (
                        <option value="Choose your scheme">
                          Choose youe Subject
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
                      <option value="Germen">Germen</option>
                      <option value="Japanese">Japanese</option>
                    </>
                  )}
                </select>
                <br />

                <br></br>
                <lebel htmlFor="degree">
                  <span style={{ color: "red" }}>*</span>Degree
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="degree"
                  placeholder="Enter here"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="experience">
                  <span style={{ color: "red" }}>*</span>Experience
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="Enter here"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="aboutMe">
                  <span style={{ color: "red" }}>*</span>About me
                </lebel>
                <br></br>
                <textarea
                  type="text"
                  className="about"
                  placeholder="Add something about your self"
                  value={aboutme}
                  onChange={(e) => setAboutMe(e.target.value)}
                ></textarea>

                <div className="btn-2">
                  <button type="submit" value="saveDetails">
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
