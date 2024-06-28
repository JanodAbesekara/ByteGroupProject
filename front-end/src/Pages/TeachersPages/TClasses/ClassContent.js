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
  const [otherlink, setOtherlink] = useState(""); // State to store other link
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

    const conformation = window.confirm(
      "Are you sure you want to add this lecture?"
    );

    if (!conformation) {
      return;
    }

    sentnotifsacition();
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
  const ClicktoHide = () => {
    setShowForm(false);
  };
  const style = {
    padding: "4px",
    border: "none",
    backgroundColor: "#337ab7",
    color: "#fff",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
  };

  const sentnotifsacition = async (e) => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const paylod = {
        titleofAnn: `New Lecture material `,
        Announcementmessage: `You have new lecture material ${subjectData.subject}  in ${subjectData.medium} solve`,
        postedemail: subjectData.email,
        TeacheSubject: subjectData.subject,
        mediua: subjectData.medium,
        date: currentDate.toISOString().split("T")[0],
        time: currentTime,
        jobrole: "Lecturer",
      };

      const response = await axios.post(`/api/send/notifaction`, paylod);
      console.log(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An error occurred while sending the notification");
      }
    }
  };

  return (
    <>
      {!showForm ? (
        <button onClick={ClicktoShow} style={style}>
          Click to Add
        </button>
      ) : (
        <button onClick={ClicktoHide} style={style}>
          Hide
        </button>
      )}
      {showForm && (
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            backgroundColor: "#CADCD9",
            borderRadius: "4px",
            flexDirection: "column",
            width: "auto",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              height: "300px",
              marginTop: "30px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              width: "auto",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
              }}
            >
              <label style={{ paddingBottom: "8px" }}>Lecture Name</label>
              <input
                type="text"
                placeholder="Enter lecture name"
                value={lesson}
                onChange={(e) => setLessonName(e.target.value)}
                style={{
                  marginBottom: "5px",
                  height: "26px",
                  paddingLeft: "5px",
                  border: "1px solid gray",
                  width: "auto",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiLogoZoom
                  style={{
                    color: "#2A629A",
                    width: "25px",
                    height: "25px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Zoom link"
                  value={zoom}
                  onChange={(e) => setZoomLink(e.target.value)}
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    height: "26px",
                    paddingLeft: "5px",
                    border: "1px solid gray",
                    width: "auto",
                  }}
                />

                <FaFilePdf
                  style={{
                    color: "#FF0000",
                    width: "20px",
                    height: "20px",
                    marginBottom: "5px",
                  }}
                />
                {pdfPerc > 0 && "Uploading : " + pdfPerc + "%"}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                  style={{
                    marginBottom: "5px",
                    width: "auto",
                  }}
                />

                <PiVideoFill
                  style={{
                    color: "Blue",
                    width: "20px",
                    height: "20px",
                    marginBottom: "5px",
                  }}
                />
                {videoPerc > 0 && "Uploading : " + videoPerc + "%"}

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  style={{
                    marginBottom: "5px",
                    width: "auto",
                  }}
                />

                <SiMaterialdesignicons
                  style={{
                    color: "Blue",
                    width: "20px",
                    height: "20px",
                    marginBottom: "5px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Any drive link added here"
                  onChange={(e) => setOtherlink(e.target.value)}
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                    height: "26px",
                    paddingLeft: "5px",
                    border: "1px solid gray",
                    width: "auto",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  color: "#fff",
                  padding: "4px 0px",
                  backgroundColor: "rgb(164, 166, 179)",
                  border: "none",
                  borderRadius: "3px",
                  width: "60px",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassContent;
