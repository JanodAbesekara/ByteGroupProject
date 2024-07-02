import React, { useState, useEffect } from "react";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import ASideBar from "../../../Component/ASideBar/ASidebar";
import {
  Grid,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";

function PaymenetManage() {
  const [groupedPaymentData, setGroupedPaymentData] = useState({});
  const [teacherEmail, setTeacherEmail] = useState("");
  const [subjects, setSubject] = useState("");
  const [mediumS, setMedium] = useState("");
  const [stuemail, setStuemail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Test/displayallpayment");
        const data = response.data.data;

        const groupedData = data.reduce((acc, payment) => {
          const { TeacherEmail, Subject, medium } = payment;

          if (!acc[TeacherEmail]) {
            acc[TeacherEmail] = {};
          }
          if (!acc[TeacherEmail][Subject]) {
            acc[TeacherEmail][Subject] = {};
          }
          if (!acc[TeacherEmail][Subject][medium]) {
            acc[TeacherEmail][Subject][medium] = [];
          }

          acc[TeacherEmail][Subject][medium].push(payment);
          return acc;
        }, {});

        setGroupedPaymentData(groupedData);
      } catch (error) {
        window.alert(error.response ? error.response.data.msg : error.message);
      }
    };
    fetchData();
  }, []);

  const handelremove = (e) => {
    e.preventDefault();

    const isConform = window.confirm(
      "Are you sure you want to remove this student?"
    );

    if (isConform) {
      const paylord = {
        teacherEmail: teacherEmail,
        Ensubject: subjects,
        Enmedium: mediumS,
        userEmail: stuemail,
      };

      try {
        console.log(paylord);
        axios.post(`/api/Test/removeStudentpayment`, paylord);
        window.alert("Succefully Removed");
        // window.location.reload();
      } catch (error) {
        window.alert(error.response ? error.response.data.msg : error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <ASideBar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <div style={{ marginLeft: "35px" }}>
              <div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "27px",
                    color: "#333A73",
                    fontWeight: "650",
                    marginBottom: "15px",
                    marginTop: "20px",
                  }}
                >
                  Remove Student
                </p>
                <form
                  onSubmit={handelremove}
                  style={{
                    width: "auto",
                    display: "flex",
                    flexDirection: "column ",
                    color: "#0049B7",
                    fontWeight: "500",
                  }}
                >
                  <label>Student Email</label>
                  <input
                    type="text"
                    name="stuemail"
                    onChange={(e) => setStuemail(e.target.value)}
                    placeholder="Student email"
                    style={{
                      marginTop: "3px",
                      marginBottom: "10px",
                      width: "auto",
                      height: "30px",
                      border: "1px solid gray",
                      paddingLeft: "5px",
                    }}
                  />
                  <label>Student Subject</label>
                  <select
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      marginTop: "3px",
                      marginBottom: "10px",
                      width: "auto",
                      height: "30px",
                      border: "1px solid gray",
                    }}
                  >
                    <option value=" ">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Music">Music</option>
                    <option value="Geography">Geography</option>
                    <option value="Health Studies">Health Studies</option>
                    <option value="Arts">Arts</option>
                    <option value="IT">IT</option>
                    <option value="Civic">Civic</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Combined Maths">Combined Maths</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Bio System Technology">
                      Bio System Technology
                    </option>
                    <option value="Engineering Technology">
                      Engineering Technology
                    </option>
                    <option value="Science for Technology">
                      Science for Technology
                    </option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Economics">Economics</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Political Science">Political Science</option>
                    <option value="Buddhism Culture">Buddhism Culture</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Media">Media</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Hindi">Hindi</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                  <label>Student Medium</label>
                  <select
                    onChange={(e) => setMedium(e.target.value)}
                    style={{
                      marginTop: "3px",
                      marginBottom: "10px",
                      width: "auto",
                      height: "30px",
                      border: "1px solid gray",
                    }}
                  >
                    <option value=" ">Select medium</option>
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                  </select>

                  <label>Teacher Email</label>
                  <input
                    type="email"
                    name="TeacherEmail"
                    placeholder="Teacher email"
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    style={{
                      marginTop: "3px",
                      marginBottom: "10px",
                      paddingLeft: "5px",
                      width: "auto",
                      height: "30px",
                      border: "1px solid gray",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "5px",
                      color: "white",
                      backgroundColor: "#007FFF",
                      border: "none",
                      borderRadius: "5px",
                      marginTop: "10px",
                      width: "65px",
                    }}
                  >
                    Remove
                  </button>
                </form>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "27px",
                  color: "#333A73",
                  fontWeight: "650",
                  marginBottom: "15px",
                  marginTop: "20px",
                }}
              >
                Payment Management
              </p>
              {Object.entries(groupedPaymentData).map(
                ([teacherEmail, subjects]) => (
                  <Box key={teacherEmail} mb={4}>
                    <p style={{ fontSize: "14px", color: "#0049B7" }}>
                      <span style={{ color: "#000" }}>Teacher : </span>
                      {teacherEmail}
                    </p>
                    {Object.entries(subjects).map(([subject, mediums]) => (
                      <Box key={subject} mb={2}>
                        <p style={{ fontSize: "14px", color: "#0049B7" }}>
                          <span style={{ color: "#000" }}>Subject : </span>
                          {subject}
                        </p>
                        {Object.entries(mediums).map(([medium, payments]) => (
                          <Box key={medium} mb={1}>
                            <p style={{ fontSize: "14px", color: "#0049B7" }}>
                              <span style={{ color: "#000" }}>Medium : </span>
                              {medium}
                            </p>
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Teacher Email
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Student Email
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Subject
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Medium
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Bank name/AccountNum
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "white",
                                        backgroundColor: "#124076",
                                        borderRight: "2px white solid",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Receipt
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {payments
                                    .slice(0)
                                    .reverse()
                                    .map((payment, index) => (
                                      <TableRow key={index}>
                                        <TableCell>
                                          {payment.TeacherEmail}
                                        </TableCell>
                                        <TableCell>
                                          {payment.stuemail}
                                        </TableCell>
                                        <TableCell>{payment.Subject}</TableCell>
                                        <TableCell>{payment.medium}</TableCell>
                                        <TableCell>
                                          {payment.Bankname} <br /> (
                                          {payment.AccountNum})
                                        </TableCell>
                                        <TableCell align="center">
                                          <a href={payment.photourl}>
                                            <img
                                              src={payment.photourl}
                                              style={{
                                                width: "60px",
                                                height: "80px",
                                              }}
                                              alt="image_url"
                                            />
                                          </a>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default PaymenetManage;
