import React, { useState } from "react";
import axios from "axios";
import "./Registrationform.css";
import { Input, Space } from "antd";

export default function RegistrationForm() {
  const [firstname, setfirstname] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const [phonenumber, setphonenumber] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [role, setrole] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmpassword) {
      const data = {
        firstname,
        lastname,
        phonenumber,
        email,
        role,
        password,
      };
    } else {
      window.alert("Password does not match!");
    }
  };

  return (
    <div>
      <div className="Main_container">
        <h2>Registration Form</h2>

        <div className="form_contents">
          
          <form onSubmit={handleSubmit}>
            <label><span style={{ color: "red" }}>* </span>Name</label>
            <br></br>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              required
              onChange={(e) => setfirstname(e.target.value)}
              style={{
                width: "350px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
                display: "inline-block"
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
                width: "350px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
            <br></br>
            <br></br>

            <label><span style={{ color: "red" }}>* </span>Phone Number</label>
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

            <label><span style={{ color: "red" }}>* </span>Email</label>
            <br></br>

            <input
              type="email"
              value={email}
              placeholder="example@example.com"
              name="email"
              required
              onChange={(e) => setemail(e.target.value)}
              style={{
                width: "350px",
                height: "40px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
            <br></br>
            <br></br>

            <label><span style={{ color: "red" }}>* </span>Are you a...</label>

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

            <label><span style={{ color: "red" }}>* </span>Password</label>
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

            <label><span style={{ color: "red" }}>* </span>Confirm Password</label>
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
    </div>
  );
}
