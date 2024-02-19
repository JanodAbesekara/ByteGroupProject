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
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../firebase";

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

  const [videos, setSubjectv] = useState("");
  const [discriV, setdiscriV] = useState("");
  const [video, setVideo] = useState(undefined);

  const [audios, setSubjecta] = useState("");
  const [discriA, setdiscriA] = useState("");
  const [audio, setAudio] = useState(undefined);
 

  const [inputs, setInputs] = useState({undefined});

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
      fileType === "PDFurl" ? "PDF/" :
      fileType === "videoUrl" ? "Video/" :
      fileType === "audioUrl" ? "Audio/" :
      "Unknown/";
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          window.alert('Upload is ' + progress + '% done');
          break;
      }
    },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('downded URl', downloadURL);
          setInputs(prev => ({
            ...prev,
            [fileType]: downloadURL
          }));
        });
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setInputs({});
      setInputs({ ...inputs, pdfS: pdfS, discriP:discriP,videos: videos,discriV: discriV,audios: audios,discriA: discriA});
      console.log(inputs);
      const response = await axios.post(`api/auth/fileuplod`,inputs);
      window.alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2} sx={{ zIndex: "20" }}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box sx={{ width: "100%", height: "1000px" }}>
            <h1>File upload</h1>
          <form onSubmit={handleSubmit} >
              <div className="Resourses">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
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
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                       onChange={(e) => setdiscriP(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose1"
                        accept="application/pdf"
                       onChange={(e) => setPDF((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                          color: "white",
                          backgroundColor: "#2387e8;",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload PDF"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod1" type="submit" >
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        onChange={(e) => setdiscriV(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose2"
                        accept="video/*"
                        onChange={(e) => setVideo((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                          color: "white",
                          backgroundColor: "#2387e8;",
                          border: "none",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload Video"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod2" type="submit">
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                      </select>

                      <h5>Discription</h5>
                      <textarea
                        placeholder="Enter some details ..."
                        onChange={(e) => setdiscriA(e.target.value)}
                      ></textarea>

                      <input
                        type="file"
                        className="chose3"
                        accept="audio/*"
                       onChange={(e) => setAudio((prev) => e.target.files[0])}
                        style={{
                          width: "100px",
                          height: "30px",
                        }}
                      />
                      <BootstrapTooltip
                        title="Upload Audio"
                        placement="bottom"
                        arrow
                      >
                        <button className="uplod3" type="submit">
                          <IoCloudUploadOutline />
                        </button>
                      </BootstrapTooltip>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Aaddresources;
