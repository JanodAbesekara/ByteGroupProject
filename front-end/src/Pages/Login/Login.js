import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Forgetpassword from "../Forgetpassword/Forgetpassword";
import axios from "axios";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import Lottie from "lottie-react";
import animatio from "./Animation/Animation - 1709401152370.json";
import Alert from "@mui/material/Alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  overflow: "hidden",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    overflow: "hidden",
  },
  "& .MuiPaper-root-MuiDialog-paper": {
    "overflow-y": "hidden",
  },
}));

function Login({ setUser, setIsLoggedIn }) {
  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState(""); // State for alert severity
  const [alertMessage, setAlertMessage] = React.useState(""); // State for alert message

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlertSeverity("error");
      setAlertMessage("Please fill in all fields.");

      return;
    }

    const data = {
      email,
      password,
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setAlertSeverity("error");
      setAlertMessage("Please enter a valid email.");
    }

    axios
      .post(`/api/auth/login`, data)
      .then((response) => {
        if (response.data) {
          const token = response.data.token;
          localStorage.setItem("MERN_AUTH_TOKEN", JSON.stringify(token));
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
          setIsLoggedIn(true);

          const jobRole = decodedToken.role;
          const encodedid = encodeURIComponent(decodedToken._id);

          let redirectPath;

          if (jobRole === "Student") {
            redirectPath = `/SDashbord?$phw=${encodedid}`;
          } else if (jobRole === "Lecturer") {
            redirectPath = `/TDashbord?$phw=${encodedid}`;
          } else {
            redirectPath = `/ADashbord?$phw=${encodedid}`;
          }

          navigate(redirectPath);
          setAlertSeverity("success"); // Set success alert on successful login
          setAlertMessage(response.data.msg); // Set alert message from response
        } else {
          console.error("Unexpected response format:", response);
          setAlertSeverity("error"); // Set error alert on unexpected response
          setAlertMessage("An unexpected error occurred. Please try again.");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.success === false
        ) {
          setAlertSeverity("error"); // Set error alert for failed login
          setAlertMessage(error.response.data.msg); // Set alert message from error response
        } else {
          console.error("Unexpected error format:", error);
          setAlertSeverity("error"); // Set error alert on unexpected error
          setAlertMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login_main">
        <div
          className="login_m2"
          style={{
            backgroundColor: "#e2e0e0e9",
            width: "100%",
            height: "40px",
          }}
        >
          {" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            severity={alertSeverity}
            sx={{ width: "100%", margin: "auto", textAlign: "center" }}
          >
            {alertMessage}
          </Alert>
        </div>
        <div className="login_h3">
          <h2>Login</h2>
        </div>
        <Lottie animationData={animatio} className="lottie" />
        <form className="login_label" onSubmit={handleSubmit}>
          <label htmlFor="Username_or_Email">
            <span style={{ color: "red" }}>*</span>Username
          </label>
          <br></br>
          <input
            className="Name"
            type="email"
            name="email"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter your username"
            required
            value={email}
          />
          <br></br>
          <label htmlFor="password">
            <span style={{ color: "red" }}>*</span>Password
          </label>
          <br></br>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="log_rem">
            <button type="submit" value="Login">
              Login
            </button>
            <br></br>
            <br></br>
            <h2>
              Forgot password?{" "}
              <Link variant="outlined" onClick={handleClickOpen}>
                Click here to reset
              </Link>
            </h2>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <Forgetpassword />
            </BootstrapDialog>
            <br></br>
            <h4>
              New ?<Link to="/Registrationform">Create An Account </Link>
            </h4>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
