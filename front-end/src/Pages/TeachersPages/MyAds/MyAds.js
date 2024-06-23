import React from "react";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { BsCloudUpload } from "react-icons/bs";
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
  let useremail;

  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    useremail = decodedToken.email;
  } else {
    useremail = " ";
  }

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
          <Box>
            <Grid container>
              <Grid item md={6} sm={6} xs={12}>
                <div
                  className="main-myadd"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      padding: "10px 30px",
                      backgroundColor: " #DFF1F9",
                      borderRadius: "20px",
                      marginTop: "50px",
                    }}
                  >
                    <div className="maindiv">
                      <h2
                        style={{
                          textAlign: "center",
                          marginTop: "50px",
                          marginBottom: "20px",
                        }}
                      >
                        Post New Add
                      </h2>
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
                          <option value="English Literature">
                            English Literature
                          </option>
                          <option value="English">English</option>
                          <option value="ICT">ICT</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Combined Mathematics">
                            Combined Mathematics
                          </option>
                          <option value="Physics">Physics</option>
                          <option value="Biology">Biologye</option>
                          <option value="Business Studies">
                            Business Studies
                          </option>
                          <option value="Accounting">Accounting</option>
                          <option value="Economics">Economics</option>
                          <option value="Logic and Scientific Method">
                            Logic and Scientific Method
                          </option>
                          <option value="Political Science">
                            Political Science
                          </option>
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
                          style={{ marginLeft: "20px", marginBottom: "10px" }}
                        />
                        <label>Grade 5</label>
                        <br></br>
                        <input
                          type="radio"
                          name="state"
                          value="O/L"
                          onChange={(e) => setEducation(e.target.value)}
                          style={{ marginLeft: "20px", marginBottom: "10px" }}
                        />
                        <label> O/L</label>

                        <br></br>
                        <input
                          type="radio"
                          name="state"
                          value="A/L"
                          onChange={(e) => setEducation(e.target.value)}
                          style={{ marginLeft: "20px", marginBottom: "10px" }}
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
                          style={{ marginLeft: "20px", marginBottom: "10px" }}
                        />
                        <label>Shinhala</label>

                        <br></br>
                        <input
                          type="radio"
                          name="state1"
                          value="English"
                          onChange={(e) => setMediem(e.target.value)}
                          style={{ marginLeft: "20px", marginBottom: "10px" }}
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
                            marginLeft: "60px",
                          }}
                          disabled={!uplodpost}
                        >
                          <BsCloudUpload />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <h2 style={{ marginTop: "100px", marginBottom: "50px" }}>
                      Instructions to add posts
                    </h2>

                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * you must add your medium and subject
                    </p>
                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * Post width grater than 400px and height grater than 400px 
                    </p>
                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * You can add your profile in to post 
                    </p>
                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * You must select  the subject  correctly
                    </p>
                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * Don't add any fake detales to the post
                    </p>
                    <p style={{ marginLeft: "50px", marginBottom: "10px" }}>
                      * Give breaf idea about you class using the post
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="main-post">
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "35px",
                  color: "#104781",
                  marginTop: "100px",
                }}
              >
                Posted Adds
              </h2>
            </div>
            <Tables
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
            />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default MyAds;
