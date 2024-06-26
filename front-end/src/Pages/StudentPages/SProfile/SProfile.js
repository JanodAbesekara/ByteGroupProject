import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./SProfile.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../../../Component/SSidebar/Ssidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";

function SProfile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
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
      const imageRef = ref(storage, `studentProfile/${userID}/profile_pic`);
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
    const imageRef = ref(storage, `studentProfile/${userID}/profile_pic`);

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

  let userEmail;
  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    userEmail = decodedToken.email;
  } else {
    userEmail = "";
  }

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

    if (!name || !email || !mobileNo) {
      window.alert("Please fill all the required fields");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;

    if (name.length < 3 || nameRegex.test(name)) {
      window.alert("Please enter a valid name");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email");
      return;
    }

    if (mobileNo.length !== 10 || isNaN(mobileNo)) {
      window.alert("Please enter a valid mobile number");
      return;
    }

    const isconform = window.confirm("Are you sure you want to save?");

    if (!isconform) {
      return;
    }

    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userID = decodedToken._id;
    setUser(decodedToken);

    const updatedUser = {
      ...user,
      name: name,
      email: email,
      mobileNo: mobileNo,
      uEmail: userEmail,
      id: userID,
      url: url,
    };

    axios
      .post(`/api/user/guardian`, updatedUser)
      .then((response) => {
        setName((pre) => (pre.length > 0 ? "" : pre));
        setEmail((pre) => (pre.length > 0 ? "" : pre));
        setMobileNo((pre) => (pre.length > 0 ? "" : pre));
        window.alert(response.data.msg);
      })
      .catch((error) => {
        window.alert(error.response.data.msg);
      });
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
                {clicked ? (
                  <button
                    onClick={() => {
                      fileInputRef.current.click();
                      setClicked(!clicked);
                    }}
                  >
                    Change
                  </button>
                ) : (
                  <button onClick={handleSave}>Save</button>
                )}
              </div>
            </div>
            <div className="student_info">
              <div className="name">
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
            </div>
          </div>

          <div className="personal_details">
            <div className="details" style={{ width: "auto", display: "flex" }}>
              <form onSubmit={handleSubmit}>
                <lebel htmlFor="Parent/Guardian Full Name">
                  <span style={{ color: "red", width: "auto" }}>*</span>
                  Parent/Guardian Full Name
                </lebel>
                <br></br>
                <input
                  type="text"
                  value={name}
                  className="name1"
                  placeholder="Enter here"
                  onChange={(e) => setName(e.target.value)}
                />

                <br></br>
                <lebel htmlFor="email">
                  <span style={{ color: "red" }}>*</span>Parent/Guardian Email
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="degree"
                  placeholder="Enter here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="mobile">
                  <span style={{ color: "red" }}>*</span>Mobile Number
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="Enter here"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                ></input>

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

export default SProfile;
