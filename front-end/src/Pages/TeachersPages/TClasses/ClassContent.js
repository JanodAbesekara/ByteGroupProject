import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { BiLogoZoom } from "react-icons/bi";
import { SiMaterialdesignicons } from "react-icons/si";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import axios from "axios";

function ClassContent({ subjectData }) {
  const [subjectdata] = useState(subjectData);

  const [lesson, setLessonName] = useState(""); // State to store lesson name
  const [zoom, setZoomLink] = useState(""); // State to store zoom link
  const [PDF, setPdf] = useState(null); // State to store PDF file
  const [video, setVideo] = useState(null); // State to store video file
  const [pdfPerc, setPdfPerc] = useState(0); // State to store PDF upload percentage
  const [videoPerc, setVideoPerc] = useState(0); // State to store video upload percentage
  const [otherlink, setOterlink] = useState(""); // State to store other link
  const [pdfUrl, setPdfUrl] = useState(""); // State to store PDF URL
  const [videoUrl, setVideoUrl] = useState(""); // State to store video URL
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    if (video) {
      uploadFile(video, "videoUrl");
    }
  }, [video]);

  useEffect(() => {
    if (PDF) {
      uploadFile(PDF, "pdfUrl");
    }
  }, [PDF]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "pdfUrl" ? "pdfs/" : "videos/";
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "pdfUrl"
          ? setPdfPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL -", downloadURL);
          if (fileType === "pdfUrl") {
            setPdfUrl(downloadURL);
          } else {
            setVideoUrl(downloadURL);
          }
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paylord = {
      TeacherEmail: subjectData.email,
      Teachersubject: subjectData.subject,
      Tmedium: subjectData.medium,
      lesson,
      zoom,
      PDF: pdfUrl,
      video: videoUrl,
      otherlink,
    };
    console.log(`paylord`, paylord);
    try {
      await axios.post(`/api/Quise/lecturematerialadd`, paylord);
      window.alert("Lecture added successfully");
      window.location.reload();
    } catch (error) {
      window.alert("Error occurred while adding lecture", error);
    }
  };

  const ClicktoShow = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <button onClick={ClicktoShow}>Click to Add</button>
      {showForm && (
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "300px",
              backgroundColor: "#CADCD9",
              marginTop: "50px",
              marginBottom: "50px",
              borderRadius: "20px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <label>Lecture Name</label>
              <input
                type="text"
                placeholder="Enter lecture name"
                value={lesson}
                onChange={(e) => setLessonName(e.target.value)}
                style={{
                  width: "20%",
                  height: "30px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                }}
              />
              <div>
                <BiLogoZoom
                  style={{
                    color: "#2A629A",
                    width: "20px",
                    height: "20px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Zoom link"
                  value={zoom}
                  onChange={(e) => setZoomLink(e.target.value)}
                />

                <br></br>
                <FaFilePdf
                  style={{
                    color: "#FF0000",
                    width: "20px",
                    height: "20px",
                  }}
                />
                {pdfPerc > 0 && "Uploading : " + pdfPerc + "%"}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                />
                <br></br>
                <PiVideoFill
                  style={{
                    color: "Blue",
                    width: "20px",
                    height: "20px",
                  }}
                />
                {videoPerc > 0 && "Uploading : " + videoPerc + "%"}

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <br></br>
                <SiMaterialdesignicons
                  style={{
                    color: "Blue",
                    width: "20px",
                    height: "20px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Any drive link added here"
                  onChange={(e) => setOterlink(e.target.value)}
                  style={{
                    width: "20%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid gray",
                  }}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassContent;
