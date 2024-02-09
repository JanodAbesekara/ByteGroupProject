import React, { useState } from "react";
import axios from "axios";
import "./Registrationform.css";
import { Input, Space } from "antd";

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

    if (password === confirmpassword) {
      const data = {
        firstname,
        lastname,
        phonenumber,
        email,
        role,
        password,
      };

      axios
        .post(`/api/auth/register`, data)
        .then((response) => {
          console.log(response.data);
          window.alert(response.data.msg);
        })
        .catch((error) => {
          console.log(error.response);
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
      <div className="Teacher_main">
        <h2> Registration Form</h2>

        <div className="Teacher_form">
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br></br>
            <input
              type="text"
              placeholder="first name"
              name="firstname"
              value={firstname}
              required
              onChange={(e) => setfirstname(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            />
            <input
              type="text"
              placeholder="last name"
              name="lastname"
              value={lastname}
              required
              onChange={(e) => setlastname(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            />
            <br></br>
            <br></br>

            <label>Phone Number</label>
            <br></br>
            <input
              type="tel"
              placeholder="Phone number"
              name="phonenumber"
              value={phonenumber}
              required
              pattern="[0-9]{10}"
              maxLength={10}
              onChange={(e) => setphonenumber(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            />
            <br></br>
            <br></br>

            <label>Email</label>
            <br></br>

            <input
              type="email"
              value={email}
              placeholder="example@example.com"
              name="email"
              required
              onChange={(e) => setemail(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            />
            <br></br>
            <br></br>

            <label>Role</label>

            <div className="radio">
              <input
                type="radio"
                name="role"
                value="Lecture"
                required
                onChange={(e) => setrole(e.target.value)}
              />{" "}
              Lecture
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

            <label>password</label>
            <br></br>
            <Space direction="vertical" className="space">
              <Input.Password
                type="password"
                value={password}
                required
                placeholder="password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                style={{
                  width: "250px",
                  height: "50px",
                  marginTop: "10px",
                  fontSize: "18px",
                }}
              />
            </Space>

            <br></br>
            <br></br>

            <label>Conform password</label>
            <br></br>
            <Space direction="vertical">
              <Input.Password
                type="password"
                required
                placeholder="conform password"
                name="conformpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "250px",
                  height: "50px",
                  marginTop: "10px",
                  fontSize: "18px",
                }}
              />
            </Space>

            <br></br>
            <br></br>
            <br></br>

            <button type="submit" value="Rigister" className="submit">
              Registra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
