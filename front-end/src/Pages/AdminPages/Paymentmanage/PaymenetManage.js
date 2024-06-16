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
            <div>
              <h3>Remove Student</h3>
              <form onSubmit={handelremove}>
                <label>Student Email:</label>
                <input
                  type="text"
                  name="stuemail"
                  onChange={(e) => setStuemail(e.target.value)}
                />
                <label>Student Subject </label>
                <select onChange={(e) => setSubject(e.target.value)}>
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
                <select onChange={(e) => setMedium(e.target.value)}>
                  <option value=" ">Select medium</option>
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                </select>

                <label>Teacher Email</label>
                <input
                  type="email"
                  name="TeacherEmail"
                  onChange={(e) => setTeacherEmail(e.target.value)}
                />
                <button type="submit">Remove</button>
              </form>
            </div>

            <h2>Payment Management</h2>
            {Object.entries(groupedPaymentData).map(
              ([teacherEmail, subjects]) => (
                <Box key={teacherEmail} mb={4}>
                  <h3>Teacher: {teacherEmail}</h3>
                  {Object.entries(subjects).map(([subject, mediums]) => (
                    <Box key={subject} mb={2}>
                      <h4>Subject: {subject}</h4>
                      <br></br>
                      {Object.entries(mediums).map(([medium, payments]) => (
                        <Box key={medium} mb={1}>
                          <h5>Medium: {medium}</h5>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Teacher Email</TableCell>
                                  <TableCell>Student Email</TableCell>
                                  <TableCell>Subject</TableCell>
                                  <TableCell>Medium</TableCell>
                                  <TableCell>Recit</TableCell>
                                  <TableCell>Bank name/AccountNum</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {payments.map((payment, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      {payment.TeacherEmail}
                                    </TableCell>
                                    <TableCell>{payment.stuemail}</TableCell>
                                    <TableCell>{payment.Subject}</TableCell>
                                    <TableCell>{payment.medium}</TableCell>
                                    <TableCell>
                                      {payment.Bankname} <br /> (
                                      {payment.AccountNum})
                                    </TableCell>
                                    <TableCell>
                                      <a href={payment.photourl}>
                                        <img
                                          src={payment.photourl}
                                          style={{
                                            width: "80px",
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
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default PaymenetManage;
