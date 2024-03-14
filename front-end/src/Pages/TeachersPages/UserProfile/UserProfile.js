import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";

function UserProfile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState("");
  const fileInputRef = useRef(null);

  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [aboutme, setAboutMe] = useState("");



  
  // Function to handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  useEffect(() => {
    // Fetch the image URL from localStorage when the component mounts
    const storedUrl = localStorage.getItem("profileImageUrl");
    if (storedUrl) {
      setUrl(storedUrl);
    }
  }, []);

  const handleSave = () => {
    const imageRef = ref(storage, "profile_pic");

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            // Save the image URL to localStorage
            localStorage.setItem("profileImageUrl", url);
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
      .get(`/getUser/${userID}`)  
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((err) => console.log(err));
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   subject,
    //   degree,
    //   experience,
    //   aboutme,
    //   email,
    //   url,
    // };
    // Perform form submission logic here (e.g., send data to server)
    // After form submission, update user info section with entered values
    setUser({
      ...user,
      subject: subject,
      degree: degree,
      experience: experience,
      aboutme: aboutme,
      email: userEmail,
    })};

    // axios
    // .post(`/api/user/userProfile`,user)
    // .then()

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
                <p>{ user.firstname + " "+ user.lastname }</p>
              </div>
            </div>
          </div>

          <div className="personal_details">
            <div className="details">
              <form onSubmit={handleSubmit}>
                <lebel htmlFor="subject">
                  <span style={{ color: "red" }}>*</span>Subject
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="subject"
                  placeholder="Enter here"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                ></input>
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
                  placeholder="Hello I am..."
                  value={aboutme}
                  onChange={(e) => setAboutMe(e.target.value)}
                ></textarea>
              </form>
            </div>
            <div className="btn-2">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
