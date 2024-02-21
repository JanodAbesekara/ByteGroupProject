import React, { useEffect, useState } from "react";
import "./Library.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import TableComponent from "./Component/TableComponent"; // Corrected import name
import axios from "axios";

const Library = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/auth/fileurlsend')
      .then(response => {
        // Handle the response data
        setData(response.data.data); // Assuming the data is structured as { success: true, data: files }
        conv
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);

  const files = [
    {
      pdfSubject: "PDF Suject",
      pdfTopic: "PDF Topic",
      pdfLink: "PDF Link",
    },
    {
      videoSubject: "Video Suject",
      videoTopic: "Video Topic",
      videoLink: "Video Link",
    },
    {
      audioSubject: "Audio Suject",
      audioTopic: "Audio Topic",
      audioLink: "Audio Link",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="L_label">
        <h2>Knowledge on your fingertips </h2>
      </div>
      <div className="sb1">
        <TableComponent rows={files} /> {/* Pass the fetched data to the TableComponent */}
      </div>
      <Footer />
    </div>
  );
};

export default Library;
