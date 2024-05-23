import React from "react";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { BsCloudUpload } from "react-icons/bs";
import "./MyAds.css";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import axios from "axios";
import Tables from "./Tables";
import { jwtDecode } from "jwt-decode";


function MyAds() {



  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const useremail = decodedToken.email;

 


  const [photos, setFile] = useState(undefined);
  const [subject, setSubjectp] = useState("");
  const [edulevel, setEducation] = useState("");
  const [medium, setMediem] = useState("");
  const [uplodpost, setUplodpost] = useState(false);

  const [submitButton, setSubmitButton] = useState(false);
  const [inputs, setInputs] = useState(undefined);

  const [selectedPost, setSelectedPost] = useState("");


  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await axios.post(`api/auth/postupdate`, inputs);
       
        window.alert(response.data.msg);
        window.location.reload();
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    };
    if (submitButton === true) {
      feachData();
      setSubmitButton(false);
      setUplodpost(false);
    }
  }, [inputs, submitButton]);

  useEffect(() => {
    photos && uploadFile(photos, "photosURL");
  }, [photos]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);

    const folder = fileType === "photosURL" ? "photos/" : "Unknown/";
    console.log(storage + " : " + folder + " : " + file);

    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, folder + "/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs((prev) => ({
            ...prev,
            [fileType]: downloadURL,
          }));
          if (folder === "photos/") {
            setUplodpost(true);
          }
        });
      }
    );
  };

  console.log(inputs);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      edulevel: edulevel,
      subject: subject,
      medium: medium,
      pagelink: "/Enrollment",
      email: useremail,
    });
   
    setSubmitButton(true);
  };



 




  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%" }}>
            <div className="main-myadd">
              <h2>Post New Add</h2>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="maindiv">
              <div className="adsdetal">
              <h3>Subject</h3>
              <select
                name="class"
                className="select"
                 onChange={(e) => setSubjectp(e.target.value)}
              >
                <option value="">subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Agriculture">Agriculture</option>
                <option value="English Literature">English Literature</option>
                <option value="English">English</option>
                <option value="ICT">ICT</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Combined Mathematics">
                  Combined Mathematics
                </option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biologye</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Accounting">Accounting</option>
                <option value="Economics">Economics</option>
                <option value="Logic and Scientific Method">
                  Logic and Scientific Method
                </option>
                <option value="Political Science">Political Science</option>
                <option value="Engineering Technology">
                  Engineering Technology
                </option>
                <option value="Bio Systems Technology">
                  Bio Systems Technology
                </option>
                <option value="Science for Technology">
                  Science for Technology
                </option>
                <option value="Grade_5">Grade 5</option>
              </select>
             
              <br></br>
              <h4>Select Education Level</h4>
              <br></br>
              <input
                type="radio"
                name="state"
                value="Grade 5"
                onChange={(e) => setEducation(e.target.value)}
              />
              <label>Grade 5</label> 
              <br></br>
              <input
                type="radio"
                name="state"
                value="O/L"
                onChange={(e) => setEducation(e.target.value)}
              />
               <label> O/L</label>
             
              <br></br>
              <input
                type="radio"
                name="state"
                value="A/L"
                onChange={(e) => setEducation(e.target.value)}
              />
               <label>A/L</label>
              
              <br></br>
              <br></br>
              <h4>Mediem</h4>
              <br></br>
              <input
                type="radio"
                name="state1"
                value="Shinhala"
                onChange={(e) => setMediem(e.target.value)}
              />
               <label>Shinhala</label>
              
              <br></br>
              <input
                type="radio"
                name="state1"
                value="English"
                onChange={(e) => setMediem(e.target.value)}
              />
               <label>English</label>
              
              <br></br>
              <input
                type="file"
                accept="image/*"
                className="inputfile"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  cursor: "pointer",
                  width: "90px",
                  height: "40px",
                }}
              />
              <button
                type="submit"
                className="sub"
                style={{
                  width: "80px",
                  height: "30px",
                  fontSize: "20px",
                  padding: "5px 10px",
                  backgroundColor: "#396EBF",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                }}
                disabled={!uplodpost}
              >
                <BsCloudUpload />
              </button>
              </div>
              </div>
            </form>

            <div className="main-post">
              <h2>Posted Adds</h2>
            </div>


            <Tables selectedPost={selectedPost} setSelectedPost={setSelectedPost} />

          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default MyAds;
