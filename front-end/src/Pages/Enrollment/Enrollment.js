import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import QRCodeGenerator from "./QRCodeGenerator";
import { jwtDecode } from "jwt-decode";
import Alert from "@mui/material/Alert";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';


function Enrollment() {
  const [postdata, setPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // alerts
  const [alertSeverity, setAlertSeverity] = useState(""); // State for alert severity
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Enrol/enrolement");
        setPostData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Convert the search query to lowercase
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // Split the search query into first name and last name
    const [firstName, lastName] = searchQueryLowerCase.split(" ");

    // Filter the data based on the search name
    const filteredData = postdata.filter(
      (item) =>
        item.posts.firstname.toLowerCase().includes(firstName) &&
        item.posts.lastname.toLowerCase().includes(lastName)
    );

    setPostData(filteredData);
  };

  const handleEnroll = (email, subject, medium) => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const payload = {
      userEmail,
      teacherEmail: email,
      Ensubject: subject,
      Enmedium: medium,
    };

    axios
      .post("/api/Enrol/studentEnrollment", payload)
      .then((response) => {
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setAlertSeverity("error");
        setAlertMessage(error.response.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  return (
    <div>
      <Link to="/Classes">
        <div style={{ marginTop: "30px", marginLeft: "20px" ,cursor:"pointer"  }}>
        <IoMdArrowRoundBack style={{width:"25px",height:"25px" ,color:"black"}} />
        </div>
      </Link>
      <h1>Enroll your Courses</h1>
      <div
        className="search"
        style={{
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          marginBottom: "50px",
        }}
      >
        <input
          className="search1"
          placeholder="Search teacher.."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            border: "1px solid black",
            padding: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "5px",
            border: "1px solid #40A2E3",
            padding: "5px",
            backgroundColor: "#40A2E3",
            color: "white",
            boxShadow: "2px 1px 10px 0.5px black",
          }}
        >
          Search
        </button>
      </div>

      <Alert
        severity={alertSeverity}
        sx={{
          width: "100%",
          margin: "auto",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {alertMessage}
      </Alert>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#201658", marginTop: "50px" }}>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "2px white solid",
                  borderLeft: "2px white solid",
                  textAlign: "center",
                }}
              >
                Teacher Details
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "2px white solid",
                  textAlign: "center",
                }}
              >
                Teacher Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "2px white solid",
                  textAlign: "center",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "2px white solid",
                  textAlign: "center",
                }}
              >
                Medium
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRight: "2px white solid",
                  textAlign: "center",
                }}
              >
                Enroll
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postdata.map((item, index) =>
              item.profile.map((profileItem, profileIndex) => (
                <TableRow key={`${index}-${profileIndex}`}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <QRCodeGenerator
                      email={item.posts.email}
                      firstname={item.posts.firstname}
                      lastname={item.posts.lastname}
                      phonenumber={item.posts.phonenumber}
                      degree={profileItem.degree}
                      experience={profileItem.experience}
                      aboutme={profileItem.aboutme}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.posts.firstname} {item.posts.lastname}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {profileItem.subject}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {profileItem.medium}
                  </TableCell>
                  <TableCell
                    sx={{
                      justifyContent: "center",
                      alignContent: "center",
                      display: "flex",
                      padding: "50px",
                    }}
                  >
                    <button
                      variant="contained"
                      disabled={selectedCourse === profileItem.subject}
                      onClick={() => {
                        setSelectedCourse(profileItem.subject);
                        handleEnroll(
                          item.posts.email,
                          profileItem.subject,
                          profileItem.medium
                        );
                      }}
                      style={{
                        color: "white",
                        padding: "5px",
                        backgroundColor:
                          selectedCourse === profileItem.subject
                            ? "#ccc"
                            : "#1b690d",
                      }}
                    >
                      {selectedCourse === profileItem.subject
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Enrollment;
