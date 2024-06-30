 import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import { styled } from "@mui/material/styles";
import "./Aaddresources.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import Alert from "@mui/material/Alert";
import DisplayResources from "./Displayresources";
import AlertBox from "../../../Component/Alertbox/Alertbox";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    fontSize: "12px",
    padding: "8px",
  },
}));

const Aaddresources = () => {
  const [pdfS, setSubjectp] = useState("");
  const [discriP, setdiscriP] = useState("");
  const [PDF, setPDF] = useState(undefined);
  const [pdfmedia, setpdfmedia] = useState("");
  const [doneUploadPDF, setDoneUploadPDF] = useState(false);

  const [videos, setSubjectv] = useState("");
  const [discriV, setdiscriV] = useState("");
  const [video, setVideo] = useState(undefined);
  const [videoMedia, setVideoMedia] = useState("");
  const [doneUploadVideo, setDoneUploadVideo] = useState(false);

  const [audios, setSubjecta] = useState("");
  const [discriA, setdiscriA] = useState("");
  const [audio, setAudio] = useState(undefined);
  const [audioMedia, setAudioMedia] = useState("");
  const [doneUploadAudio, setDoneUploadAudio] = useState(false);

  const [submitButton, setSubmitButton] = useState(false);
  const [inputs, setInputs] = useState(undefined);

  const [alertSeverity, setAlertSeverity] = React.useState(""); // State for alert severity
  const [alertMessage, setAlertMessage] = React.useState(""); // State for alert message


  const [Alertdata, setAlertdata] = useState({
    show: false,
    message: "",
    type: "",
    description: "",
  }); // State for alert box
  const [triggerNotification, setTriggerNotification] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`api/auth/fileupload`, inputs);
        setAlertSeverity("success"); // Set success alert on successful login
        setAlertMessage(response.data.msg);
        window.alert(response.data.msg);
        window.location.reload();
      } catch (error) {
        window.alert(error.response.data.msg);
        
        setAlertSeverity("error"); // Set error alert on unexpected error
        setAlertMessage("An unexpected error occurred. Please try again.");
      }
    };
    if (submitButton === true) {
      fetchData();
      setSubmitButton(false);
      setDoneUploadPDF(false);
      setDoneUploadVideo(false);
      setDoneUploadAudio(false);
    }
  }, [inputs, submitButton]);

  useEffect(() => {
    PDF && uploadFile(PDF, "PDFurl");
  }, [PDF]);

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    audio && uploadFile(audio, "audioUrl");
  }, [audio]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder =
      fileType === "PDFurl"
        ? "PDF/"
        : fileType === "videoUrl"
        ? "Video/"
        : fileType === "audioUrl"
        ? "Audio/"
        : "Unknown/";
    console.log(storage + " : " + folder + " : " + file);

    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, folder + fileName);
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
          console.log("downded URl", downloadURL);
          setInputs((prev) => ({
            ...prev,
            [fileType]: downloadURL,
          }));
          if (folder === "PDF/") {
            setDoneUploadPDF(true);
          } else if (folder === "Video/") {
            setDoneUploadVideo(true);
          } else if (folder === "Audio/") {
            setDoneUploadAudio(true);
          }
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertdata({
      show: true,
      message: `Resource Uploded`,
      type: "success",
      description: `Your Uplord File to KnowdgleBase Succfully !`,
    });
    setTriggerNotification(true);
    setInputs({
      ...inputs,
      pdfS: pdfS,
      discriP: discriP,
      videos: videos,
      discriV: discriV,
      audios: audios,
      discriA: discriA,
      pdfmedia: pdfmedia,
      videoMedia: videoMedia,
      audioMedia: audioMedia,
    });
    setSubmitButton(true);
  };

  const resetNotification = () => {
    setTriggerNotification(false);
 
  };


  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2} sx={{ zIndex: "20" }}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
        {Alertdata.show && (
          <AlertBox
            data={Alertdata}
            triggerNotification={triggerNotification}
            resetNotification={resetNotification}
          />
        )}
          <Box sx={{marginBottom:"100px"}}>
            <div>
            <h1>File upload</h1>
            <div className="Resourses">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <form onSubmit={handleSubmit}>
                    <div className="pdf">
                      <h3>PDF</h3>
                      <h4 for="subject">Subject</h4>
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
                      <h4>Medium</h4>
                      <select onChange={(e) => setpdfmedia(e.target.value)}>
                        <option value="">Medium</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="English">English</option>
                      </select>
                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        onChange={(e) => setdiscriP(e.target.value)}
                      ></textarea>

                      <BootstrapTooltip
                        title="Chose PDF only "
                        placement="bottom"
                        arrow
                      >
                        <input
                          type="file"
                          className="chose1"
                          accept="application/pdf"
                          onChange={(e) => setPDF(e.target.files[0])}
                          style={{
                            width: "100px",
                            height: "30px",
                            color: "white",
                            backgroundColor: "#2387e8",
                            border: "none",
                            cursor: "pointer",
                          }}
                        />
                      </BootstrapTooltip>

                      <button
                        className="uplod1"
                        disabled={!doneUploadPDF}
                        type="submit"
                      >
                        <IoCloudUploadOutline />
                      </button>
                    </div>
                  </form>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <form onSubmit={handleSubmit}>
                    <div className="video">
                      <h3 style={{}}>Video</h3>
                      <h4 for="subject">Subject</h4>

                      <select
                        name="class"
                        className="select"
                        onChange={(e) => setSubjectv(e.target.value)}
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
                      <h4>Medium</h4>
                      <select onChange={(e) => setVideoMedia(e.target.value)}>
                        <option value="">Medium</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="English">English</option>
                      </select>
                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        onChange={(e) => setdiscriV(e.target.value)}
                      ></textarea>
                      <BootstrapTooltip
                        title="Chose Videoes only"
                        placement="bottom"
                        arrow
                      >
                        <input
                          type="file"
                          className="chose2"
                          accept="video/*"
                          onChange={(e) => setVideo(e.target.files[0])}
                          style={{
                            width: "100px",
                            height: "30px",
                            color: "white",
                            backgroundColor: "#2387e8;",
                            border: "none",
                          }}
                        />
                      </BootstrapTooltip>

                      <button
                        className="uplod2"
                        disabled={!doneUploadVideo}
                        type="submit"
                      >
                        <IoCloudUploadOutline />
                      </button>
                    </div>
                  </form>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <form onSubmit={handleSubmit}>
                    <div className="Adio">
                      <h3>Audio</h3>
                      <h4 for="subject">Subject</h4>

                      <select
                        name="class"
                        className="select"
                        onChange={(e) => setSubjecta(e.target.value)}
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
                      <h4>Medium</h4>
                      <select onChange={(e) => setAudioMedia(e.target.value)}>
                        <option value="">Medium</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="English">English</option>
                      </select>
                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        onChange={(e) => setdiscriA(e.target.value)}
                      ></textarea>
                      <BootstrapTooltip
                        title="Chose Audio only"
                        placement="bottom"
                        arrow
                      >
                        <input
                          type="file"
                          className="chose3"
                          accept="audio/*"
                          onChange={(e) => setAudio(e.target.files[0])}
                          style={{
                            width: "100px",
                            height: "30px",
                          }}
                        />
                      </BootstrapTooltip>
                      <button
                        className="uplod3"
                        disabled={!doneUploadAudio}
                        type="submit"
                      >
                        <IoCloudUploadOutline />
                      </button>
                    </div>
                  </form>
                </Grid>
              </Grid>
            </div>
            </div>
          </Box>
          <DisplayResources />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Aaddresources;
