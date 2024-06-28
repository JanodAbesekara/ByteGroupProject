import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Resetpassword.css";
import { Input, Space } from "antd";

export default function Resetpassword() {
  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();
  const [passwordN, setPasswordN] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = jwtDecode(token);

    if (
      passwordN.length < 8 &&
      !/[A-Z]/.test(passwordN) &&
      !/[a-z]/.test(passwordN) &&
      !/[0-9]/.test(passwordN) &&
      !/[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/.test(passwordN)
    ) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    if (passwordN !== passwordC) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post("/api/auth/resetpassword", {
        email,
        newPassword: passwordN,
        confirmNewPassword: passwordC,
      })
      .then((res) => {
        window.alert(res.data.msg);

        if (res.data.success) {
          window.close();
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "An error occurred");
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/auth/verifyToken?token=${token}`)
        .then((res) => {
          setIsTokenVerified(true);
          Navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  return (
    <div>
      {isTokenVerified ? (
        <div className="RPdiv">
          <h2>Reset </h2>

          <h2>Password</h2>
          <label className="RPlabel1" htmlFor="New Password">
            <b>NewPassword</b>
          </label>
          <br />
          <br />
          <br></br>

          <Space direction="vertical" className="space">
            <Input.Password
              className="RPiput1"
              type="password"
              name="passwordN"
              placeholder="Enter your new password"
              autoComplete="off"
              required
              value={passwordN}
              onChange={(e) => setPasswordN(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
          </Space>

          <br />
          <br />
          <label className="RPlabel2" htmlFor="Confirm Password">
            <b>ConfirmPassword</b>
          </label>

          <Space direction="vertical" className="space">
            <Input.Password
              className="RPiput2"
              type="password"
              name="passwordC"
              value={passwordC}
              required
              placeholder="Re-enter your password"
              autoComplete="off"
              onChange={(e) => setPasswordC(e.target.value)}
              style={{
                width: "250px",
                height: "50px",
                marginTop: "10px",
                fontSize: "15px",
              }}
            />
          </Space>

          <br />
          <br />
          <button
            className="RPbutton"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            ResetPassword
          </button>
        </div>
      ) : (
        <h2 className="RPver">Verifying Token, Please Wait...</h2>
      )}
      {/* Display error message */}
      {error && <p>{error}</p>}
    </div>
  );
}
