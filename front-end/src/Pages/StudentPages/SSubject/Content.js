import React, { useEffect, useState, useRef } from "react";
import { FaFilePdf } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { BiLogoZoom } from "react-icons/bi";
import { SiMaterialdesignicons } from "react-icons/si";
import axios from "axios";
import { Link } from "react-router-dom";
import ComAttendence from "./ComAttendence";

function Content({ teachermail, subject, medium }) {
  const [subjectQuiz, setSubjectQuiz] = useState([]);
  const [error, setError] = useState(null);
  const attendenceRef = useRef();

  useEffect(() => {
    const fetchSubjectQuiz = async () => {
      try {
        const patlord = {
          teachermail: teachermail,
          subject: subject,
          medium: medium,
        };
        const response = await axios.post(
          `/api/Test/getlecturematerial`,
          patlord
        );
        const filteredMaterial = response.data.data;

        setSubjectQuiz(filteredMaterial);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchSubjectQuiz();
  }, [teachermail, subject, medium]);

  const handleZoomClick = (e) => {
    e.preventDefault();
    if (attendenceRef.current) {
      attendenceRef.current.handleClick();
    }
    window.location.href = e.currentTarget.href;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>
          {error && <p>{error}</p>}
          {subjectQuiz.map((material) => (
            <div key={material.id} className="content">
              <div className="content__icon">
                <p>{material.lesson} </p>
                <br />
                {material.PDF ? (
                  <Link to={material.PDF} target="_blank">
                    <FaFilePdf />
                  </Link>
                ) : null}
                <br />
                {material.video ? (
                  <Link to={material.video} target="_blank">
                    <PiVideoFill />
                  </Link>
                ) : null}
                <br />
                {material.zoom ? (
                  <Link
                    to={material.zoom}
                    onClick={handleZoomClick}
                    target="_blank"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <BiLogoZoom />
                    </div>
                  </Link>
                ) : null}
                <br />
                {material.otherlink ? (
                  <Link to={material.otherlink} target="_blank">
                    <SiMaterialdesignicons />
                  </Link>
                ) : null}
                <br />
                <ComAttendence
                  ref={attendenceRef}
                  teachermail={teachermail}
                  subject={subject}
                  medium={medium}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Content;
