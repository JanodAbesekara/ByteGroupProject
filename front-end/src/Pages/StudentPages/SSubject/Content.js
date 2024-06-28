import React, { useEffect, useState, useRef } from "react";
import { FaFilePdf } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { FaVideo } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { BiLogoZoom } from "react-icons/bi";
import { SiMaterialdesignicons } from "react-icons/si";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Content({ teachermail, subject, medium }) {
  const [subjectQuiz, setSubjectQuiz] = useState([]);
  const [error, setError] = useState(null);
  const attendenceRef = useRef();
  const formRef = useRef();
  const [Showmaterial, setShowmaterial] = useState(false);

  let firstname;
  let lastname;

  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    firstname = decodedToken.firstname;
    lastname = decodedToken.lastname;
  } else {
    firstname = " ";
    lastname = " ";
  }

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);
    try {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const response = await axios.post("/api/user/studentattendence", {
        studentnemail: decodedToken.email,
        studentname: firstname + " " + lastname,
        subject: subject,
        teachetmail: teachermail,
        medium: medium,
      });
    } catch (error) {
      window.alert(error.response.data.msg);
    } finally {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    const fetchSubjectQuiz = async () => {
      try {
        const response = await axios.get(`/api/Test/getlecturematerial`, {
          params: {
            teachermail: teachermail,
            subject: subject,
            medium: medium,
          },
        });
        const filteredMaterial = response.data.data;

        setSubjectQuiz(filteredMaterial);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchSubjectQuiz();
  }, [teachermail, subject, medium]);

  const handleZoomClick = async (e, zoomLink) => {
    e.preventDefault();
    if (formRef.current) {
      await handleSubmit(new Event("submit"));
      window.location.href = zoomLink;
    }
  };

  const handelShowMat = () => {
    setShowmaterial(!Showmaterial);
  };
  return (
    <div>
      <div>
        <button
          onClick={handelShowMat}
          style={{
            marginTop: "20px",
            marginBlock: "10px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            padding: "3px",
            color: "#fff",
            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          }}
        >
          Materials
        </button>

        {Showmaterial && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>
              {error && <p>{error}</p>}
              {subjectQuiz
                .slice()
                .reverse()
                .map((material) => (
                  <div key={material.id} className="content" style={{backgroundColor:"#fff", margin:"8px", padding:"10px", borderRadius:"3px", width:"auto"}}>
                    <div className="content__icon" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>

                      <p style={{fontWeight:"500", fontSize:"14px"}}>{material.lesson} </p>
                     
                     
                     
                      {material.zoom && (
                        <>
                          <form ref={formRef} onSubmit={handleSubmit}>
                            <button
                              type="submit"
                              disabled={buttonDisabled}
                              style={{ display: "none" }}
                            >
                              Attend to lecture
                            </button>
                          </form>
                          <Link
                            to="#"
                            onClick={(e) => handleZoomClick(e, material.zoom)}
                            target="_blank"
                          >
                            <div
                              style={{ display: "flex", alignItems: "center", color:"blue", marginTop:"12px", marginBottom:"14px", paddingLeft:"2px" }}
                            >
                              <IoVideocam />
                            </div>
                          </Link>
                        </>
                      )}
    
                      {material.PDF && (
                        <Link to={material.PDF} target="_blank" style={{color:"red", marginBottom:"14px"}}>
                          <FaFilePdf />
                        </Link>
                      )}
                     
                      {material.video && (
                        <Link to={material.video} target="_blank" style={{marginBottom:"14px"}}>
                          <CgPlayButtonR />
                        </Link>
                      )}
                     
                      {material.otherlink && (
                        <Link to={material.otherlink} target="_blank">
                          <SiMaterialdesignicons />
                        </Link>
                      )}
                     
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
