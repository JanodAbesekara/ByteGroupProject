import React, { useState, useEffect } from "react";
import axios from "axios";
import RadioButton from "./RadioButton";
import "./UploadBox.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../../firebase";

function UploadBox({ className, subjectdata }) {
  const [saved, setSaved] = useState(false); // State to manage saved status
  const [editMode, setEditMode] = useState(true); // State to manage edit mode
  const [lesson, setLessonName] = useState(""); // State to store lesson name
  const [zoom, setZoomLink] = useState(""); // State to store zoom link
  const [PDF, setPdf] = useState(""); // State to store PDF file
  const [video, setVideo] = useState(""); // State to store video file
  const [pdfPerc, setPdfPerc] = useState(0); // State to store PDF upload percentage
  const [videoPerc, setVideoPerc] = useState(0); // State to store video upload percentage
 const [subjectdataState] = useState(subjectdata);

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    PDF && uploadFile(PDF, "pdfUrl");
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
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.post(`api/materal/materalsubmit`, {
        TeacherEmail: subjectdataState.email,
        subject: subjectdataState.subject,
        medium: subjectdataState.medium,
        lessonName: lesson,
        zoomLink: zoom,
        pdfUrl: PDF,
        videoUrl: video,
      });
      setSaved(true); // Set saved status to true after successful submission
      setEditMode(false); // Disable edit mode after saving

      
      window.alert("Successful");
    } catch (error) {
      console.log(error);
    }
  };


  const handleSave = () => {
    setSaved(true);
    setEditMode(false); // Disable edit mode after saving
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
    setSaved(false); // Reset saved status when editing
  };

  return (
    <div className={`learnmate ${className}`} style={{ position: "relative" }}>
      <RadioButton />
      <div className="lessonlabel">
        <p>{subjectdataState}</p>
        {editMode ? (
          <input
            type="text"
            placeholder="Name of the lesson"
            value={lesson}
            onChange={(e) => setLessonName(e.target.value)}
          />
        ) : (
          <div className="topic">{lesson}</div>
        )}
      </div>
      <br />
      <div className="upload">
        <form onSubmit={handleSubmit}>
          <div>
            <img src="./Lecture/Zoom.png" alt="zoom" />
            {/* Input for Zoom Link */}
            <input
              type="text"
              placeholder="Zoom link"
              disabled={!editMode}
              value={zoom}
              onChange={(e) => setZoomLink(e.target.value)}
            />
            <br />
            <img src="./Lecture/pdf.png" alt="pdf" />
            {/* Upload PDF */}
            {pdfPerc > 0 && "Uploading : " + pdfPerc + "%"}
            <input
              type="file"
              accept=".pdf"
              disabled={!editMode}
              onChange={(e) => setPdf(e.target.files[0])}
            />
          
            <br />
            <img src="./Lecture/recoding.png" alt="video" />
            {/* Upload Video */}
            {videoPerc > 0 && "Uploading : " + videoPerc + "%"}
            <input
              type="file"
              accept="video/*"
              disabled={!editMode}
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <br />

            <div
              className="Edit"
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              {editMode ? (
                <button
                  type="submit"
                  onClick={handleSave}
                  style={{ color: "white", marginInline: "20px" }}
                >
                  {saved ? "Saved" : "Save"}
                </button>
              ) : (
                <button disabled>Saved</button>
              )}
              <button type="reset" onClick={handleEdit} disabled={!saved}>
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UploadBox;
