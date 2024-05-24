import React, { useEffect, useState } from "react";
import "./Library.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import TableComponent from "./Component/Tablecomponenet";
import axios from "axios";

const Library = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFille();
  }, []);

  const getFille = () => {
    axios
      .get(`api/auth/fileurlsend`)
      .then((response) => {
        setFiles(response?.data?.data || []);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="L_label">
        <h2>Knowledge on your fingertips </h2>
      </div>
      <div className="sb1">
        <TableComponent
          rows={files.map((file) => ({
            pdfLink: file.PDFurl,
            pdfTopic: file.discriP,
            videoLink: file.videoUrl,
            videoTopic: file.discriV,
            audioLink: file.audioUrl,
            audioTopic: file.discriA,
            pdfSubject: file.pdfS,
            videoSubject: file.videos,
            audioSubject: file.audios,
            pdfMedia: file.pdfmedia,
            videomedia: file.videoMedia,
            audiomedia: file.audioMedia,
          }))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Library;
