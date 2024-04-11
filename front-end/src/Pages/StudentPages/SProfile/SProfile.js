import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Ssidebar from "../../../Component/SSidebar/Ssidebar";
import './SProfile.css';

function SProfile() {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState("");
  const fileInputRef = useRef(null);

  const [Gname, setGname] = useState("");
  const [Gemail, setGemail] = useState("");
  const [mobile, setMobile] = useState("");

  const [isDetailsUploaded, setIsDetailsUploaded] = useState(false);

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
    const imageRef = ref(storage, "student/profile_pic");

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

  // getting users name
  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    axios
        .get(`api/user/userProfile/${userID}`)
        .then((response)=>{
          const userData = response.data;
          setUser(userData);
        })
        .catch((error)=>console.log(error));
  }, []);

  const handleSubmit = (e) => {
  

    e.preventDefault();

    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userID = decodedToken._id;
    setUser(decodedToken);

    const updatedUser = {
      ...user,
      name: Gname,
      email: Gemail,
      mobileNo: mobile,
      id: userID,
    };


    axios
      .post(`/api/user/student`, updatedUser)
      .then((response) => {
        setIsDetailsUploaded(true);
        window.alert(response.data.msg);
        console.log(response.data.msg);

    setGname((pre) => (pre.length > 0 ? "" : pre));
    setGemail((pre) => (pre.length > 0 ? "" : pre));
    setMobile((pre) => (pre.length > 0 ? "" : pre));

        localStorage.setItem("detailsUploaded","true");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        window.alert(error.response.data.msg);
      });
  };

  useEffect(() => {
    setIsDetailsUploaded(false);
    // Check if the details have been uploaded when the component mounts
    const uploaded = localStorage.getItem("detailsUploaded");
    if (uploaded === "true") {
      setIsDetailsUploaded(true);
    }
  }, []);




  return (
    <div>
      <Navbar />
      <div className="head">
        <div className="container2">
          <Ssidebar />
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
            <div className="student_info">
              <div className="name">
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
            </div>
          </div>

          <div className="personal_details">
          <div className="text"><p style={
            {
              color: '#1193C7',
              fontWeight: 'bold',
              fontSize: '16px',
            }
          }
          >Parent / Guardian Details</p></div>
          <br></br>
          <br></br>
          <hr/>
          <br/>
            <div className="details"> 
              <form onSubmit={handleSubmit}>
                <lebel htmlFor="subject">
                  <span style={{ color: "red" }}>*</span>Name
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="name"
                  placeholder="Ex: John Noel"
                  value={Gname}
                  onChange={(e) => setGname(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="email">
                  <span style={{ color: "red" }}>*</span>Email
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="Gemail"
                  placeholder="example@gmail.com"
                  value={Gemail}
                  onChange={(e) => setGemail(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="mobile">
                  <span style={{ color: "red" }}>*</span>Mobile Number
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="077 777 777 7"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                ></input>
                <br></br>
                

                <div className="warning">
                  <p style={{color: "#960a08"}}>Double check the details before push the send button. Once you pushed the button, you can't change the details.</p>
                </div>
                <div className="btn-2">
                  <button type="submit" value="saveDetails">
                    Save
                  </button>
                  <br/><br/>
                  {isDetailsUploaded && <p style={{
                    color: "#0a6e1e"
                  }}>You have uploaded your details!</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SProfile
