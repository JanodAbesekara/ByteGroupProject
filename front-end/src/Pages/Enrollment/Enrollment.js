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

function Enrollment() {
  // const [teachers, setTeachers] = useState([]);
  const [postdeatal, setPosts] = useState([]);
  const [Profile, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacherEmail, setteacherEmail] = useState();
  const [enroller , setenroller] = useState("");
  const [subject, setsubject] = useState("");

  useEffect(() => {
    const featchteacher = () => {
      axios
        .get(`/api/Enrol/enrolement`)
        .then((response) => {
          // console.log(response.data.data);
          // Extract profile and posts separately
          const profiles = response.data.data.map((item) => item.profile);
          const posts = response.data.data.map((item) => item.posts);

          // Set the state for profiles and posts
          setProfiles(profiles);
          setPosts(posts);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    featchteacher();
  }, []);

  const handleSearch = () => {
    const filteredTeachers = postdeatal.filter(
      (posts) =>
        posts.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posts.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPosts(filteredTeachers);
  };

  const handleEnroll = async (req, res) => {
    try {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
 
      setenroller({
        userEmail:userEmail,
        teacherEmail: teacherEmail,
        Ensubject : subject
      });

      //  const paylord = {teacherEmail,useremail,subject};
      const response = await axios(`/api/Enrol/studentEnrollment`);
      console.log(response);
      // setSelectedCourse(subject); // Assuming subject is unique
    } catch (error) {
      console.error("Error during enrollment:", error);
    }
  };

  return (
    <div>
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
                Enroll
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postdeatal.length > 0 &&
              Profile.length > 0 &&
              postdeatal.map((post, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <QRCodeGenerator
                      email={Profile[index].email}
                      firstname={post.firstname}
                      lastname={post.lastname}
                      phonenumber={post.phonenumber}
                      degree={Profile[index].degree}
                      experience={Profile[index].experience}
                      aboutme={Profile[index].aboutme}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {post.firstname} {post.lastname}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {Profile[index].subject}
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
                      disabled={selectedCourse === Profile[index].subject}
                      onClick={() => {
                        setSelectedCourse(Profile[index].subject);
                        handleEnroll(
                          Profile[index].email,
                          Profile[index].subject
                        );
                      }}
                      style={{
                        color: "white",
                        backgroundColor:
                          selectedCourse === Profile[index].subject
                            ? "#ccc"
                            : "#1b690d",
                      }}
                    >
                      {selectedCourse === Profile[index].subject
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Enrollment;
