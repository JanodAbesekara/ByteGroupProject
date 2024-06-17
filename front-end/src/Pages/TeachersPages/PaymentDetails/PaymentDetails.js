import React, { useEffect, useState } from "react";
import "./PaymentDetails.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../../../Component/TeacherSidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Displaypyment from "./Displaypyment";

export default function PaymentDetails() {
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [confirmAccount, setConfirmAccount] = useState("");
  const [status, setPreviousStatus] = useState("");

  let userID;

  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    userID = decodedToken._id;
  } else {
    userID = " ";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const TeacherEmail = decodedToken.email;
    if (accountNo === confirmAccount) {
      const paymentDetails = {
        id: userID,
        bank: bank,
        accountNo: accountNo,
        TeacherEmail: TeacherEmail,
      };

      axios
        .post(`api/user/payment`, paymentDetails)
        .then((response) => {
          window.alert(response.data.msg);
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error.response.data.msg);
        });
    } else {
      window.alert("Account Numbers Does not match ");
    }
  };

  useEffect(() => {
    axios
      .get(`api/user/payment/${userID}`)
      .then((response) => {
        const previous = response.data;
        setPreviousStatus(previous);
      })
      .catch((error) => console.log(error.response.data.msg));
  }, []);
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            <div className="personal_details">
              <div className="text">
                <p
                  style={{
                    color: "#1193C7",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Payment Details
                </p>
              </div>
              <br></br>
              <br></br>
              <hr />
              <br />
              <div className="details">
                <form onSubmit={handleSubmit}>
                  <lebel htmlFor="bankName">
                    <span style={{ color: "red" }}>*</span>Choose Your Bank
                  </lebel>
                  <br></br>
                  <select
                    style={{
                      height: "32px",
                      width: "350px",
                      borderRadius: "5px",
                      border: "0.5px solid #10155b4d",
                      color: "#969683",
                    }}
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <option value=" ">Select Your Bank</option>
                    <option value="Sampath Bank">Sampath Bank</option>
                    <option value="Commercial Bank">Commercial Bank</option>
                    <option value="Peoples Bank">Peoples Bank</option>
                    <option value="Bank of Ceylon">Bank of Ceylon</option>
                    <option value="HABIB Bank">HABIB Bank</option>
                    <option value="Ceylan Bank">Ceylan Bank</option>
                    <option value="Hatton National Bank">
                      Hatton National Bank
                    </option>
                    <option value="Nations Saving Bank">
                      Nations Saving Bank
                    </option>
                  </select>
                  <br />
                  <br></br>
                  <lebel htmlFor="acno">
                    <span style={{ color: "red" }}>*</span>Enter Your Account
                    Number
                  </lebel>
                  <br></br>
                  <input
                    type="text"
                    className="ac_no"
                    placeholder="Enter here"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  ></input>
                  <br></br>
                  <lebel htmlFor="cacno">
                    <span style={{ color: "red" }}>*</span>Confirm Account
                    Number
                  </lebel>
                  <br></br>
                  <input
                    type="text"
                    className="c_ac_no"
                    placeholder="Enter here"
                    value={confirmAccount}
                    onChange={(e) => setConfirmAccount(e.target.value)}
                  ></input>
                  <br></br>

                  <div className="btn-2">
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
              <br />
              <span>
                {" "}
                {status && (
                  <p
                    style={{
                      color: "#145212",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    You have uploaded your bank details !
                  </p>
                )}
              </span>
            </div>
            <Displaypyment />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
