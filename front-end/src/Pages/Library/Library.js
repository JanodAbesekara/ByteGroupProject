import React, { useEffect, useState } from "react";
import "./Library.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import TableComponent from "./Component/Tablecomponenet";
import axios from "axios";

const Library = () => {
  const [files, setFiles] = useState([]);
  const[list, setlist] = useState();
  useEffect(() => {

    getFille();

  }, []);

  const getFille = () => {
    axios.get(`api/auth/fileurlsend`, files).then((response) => {
      setFiles(response?.data?.data[0] || []);

      console.log(response.data.data[0]);
    });
  }

  return (
    <div>
      <Navbar />
      <div className="L_label">
        <h2>Knowledge on your fingertips </h2>
      </div>
      <div className="sb1">
        <TableComponent rows={files} />
      </div>
      <Footer />
    </div>
  );
};

export default Library;
