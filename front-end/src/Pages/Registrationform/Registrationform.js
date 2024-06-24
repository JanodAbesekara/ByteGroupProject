import React, { useState } from "react";
import axios from "axios";
import "./Registrationform.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

export default function TeachersRegister() {
  const [firstname, setfirstname] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const [phonenumber, setphonenumber] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [role, setrole] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      phonenumber === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === "" ||
      role === ""
    ) {
      window.alert("Please fill all the fields");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      window.alert(
        "First name and Last name cannot contain numbers or special characters"
      );
      return;
    }

    if (password === confirmpassword) {
      const data = {
        firstname,
        lastname,
        phonenumber,
        email,
        role,
        password,
      };

      if (
        firstname === "" &&
        lastname === "" &&
        phonenumber === "" &&
        email === "" &&
        password === "" &&
        role === ""
      ) {
        window.alert("Please fill all the fields");
        return;
      }

      if (role === "") {
        window.alert("Please select your role");
        return;
      }

      if (phonenumber.length !== 10) {
        window.alert("Invalid Phone Number");
        return;
      }

      if (firstname.length < 3 || lastname.length < 3) {
        window.alert("Name must contain at least 3 characters");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        window.alert("Invalid Email");
        return;
      }

      if (
        password.length < 8 &&
        confirmpassword.length < 8 &&
        password !== confirmpassword &&
        !/[A-Z]/.test(password) &&
        !/[a-z]/.test(password) &&
        !/[0-9]/.test(password) &&
        !/[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/.test(password)
      ) {
        window.alert(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        );
        return;
      }

      axios
        .post(`/api/auth/register`, data)
        .then((response) => {
          window.alert(response.data.msg);
          window.location.reload();
          window.location = "/login";
        })
        .catch((error) => {
          if (error.response.data.success === false) {
            window.alert(error.response.data.msg);
          }
        });
    } else {
      window.alert("Password donot match");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Main_container">
        <h2>Registration Form</h2>

        <div className="form_contents">
          <form onSubmit={handleSubmit}>
            <label>
              <span style={{ color: "red" }}>* </span>Name
            </label>
            <br></br>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              required
              onChange={(e) => setfirstname(e.target.value)}
              style={{
                width: "280px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
                display: "inline-block",
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={lastname}
              required
              onChange={(e) => setlastname(e.target.value)}
              style={{
                width: "280px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
            <br></br>
            <br></br>

            <label>
              <span style={{ color: "red" }}>* </span>Phone Number
            </label>
            <br></br>
            <input
              type="tel"
              placeholder="Phone Number"
              name="phonenumber"
              value={phonenumber}
              required
              pattern="[0-9]{10}"
              maxLength={10}
              onChange={(e) => setphonenumber(e.target.value)}
              style={{
                width: "280px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
            <br></br>
            <br></br>

            <label>
              <span style={{ color: "red" }}>* </span>Email
            </label>
            <br></br>

            <input
              type="email"
              value={email}
              placeholder="example@example.com"
              name="email"
              required
              onChange={(e) => setemail(e.target.value)}
              style={{
                width: "280px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
            <br></br>
            <br></br>

            <label>
              <span style={{ color: "red" }}>* </span>Are you a...
            </label>

            <div className="radio">
              <input
                type="radio"
                name="role"
                value="Lecturer"
                required
                onChange={(e) => setrole(e.target.value)}
              />{" "}
              Lecturer
              <br></br>
              <input
                type="radio"
                name="role"
                value="Student"
                required
                onChange={(e) => setrole(e.target.value)}
              />{" "}
              Student
            </div>

            <br></br>
            <br></br>

            <label>
              <span style={{ color: "red" }}>* </span>Password
            </label>
            <br></br>
            <input
              type="password"
              value={password}
              required
              placeholder="Password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
              style={{
                width: "250px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />

            <br></br>
            <br></br>

            <label>
              <span style={{ color: "red" }}>* </span>Confirm Password
            </label>
            <br></br>

            <input
              type="password"
              required
              placeholder="Confirm Password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "250px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />

            <br></br>
            <br></br>
            <br></br>

            <button type="submit" value="Register" className="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
