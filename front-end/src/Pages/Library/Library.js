import React from "react";
import "./Library.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import Tablecomponenet from "./Component/Tablecomponenet";

const files = [
  {
    pdfSubject: "PDF Subject",
    pdfTopic: "PDF Topic",
    pdfLink: "PDF Link",
    videoSubject: "Video Subject",
    videoTopic: "Video Topic",
    videoLink: "Video Link",
    audioSubject: "Audio Subject",
    audioTopic: "Audio Topic",
    audioLink: "Audio Link",
  },

  {
    pdfSubject: "PDF Subject",
    pdfTopic: "PDF Topic",
    pdfLink: "PDF Link",
    videoSubject: "Video Subject",
    videoTopic: "Video Topic",
    videoLink: "Video Link",
    audioSubject: "Audio Subject",
    audioTopic: "Audio Topic",
    audioLink: "Audio Link",
  },

  {
    pdfSubject: "PDF Suject",
    pdfTopic: "PDF Topic",
    pdfLink: "PDF Link",
    videoSubject: "Video Suject",
    videoTopic: "Video Topic",
    videoLink: "Video Link",
    audioSubject: "Audio Suject",
    audioTopic: "Audio Topic",
    audioLink: "Audio Link",
  },
  {
    pdfSubject: "PDF Suject",
    pdfTopic: "PDF Topic",
    pdfLink: "PDF Link",
    videoSubject: "Video Suject",
    videoTopic: "Video Topic",
    videoLink: "Video Link",
    audioSubject: "Audio Suject",
    audioTopic: "Audio Topic",
    audioLink: "Audio Link",
  },

];

const Library = () => {
  return (
    <div>
      <Navbar />
      <div className="L_label">
        <h2>Knowledge on your fingertips </h2>
      </div>
      <div className="sb1">
        <Tablecomponenet rows={files} />
      </div>
      <Footer />
    </div>
  );
};

export default Library;
