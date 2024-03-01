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

export default function Login({ setUser, setIsLoggedIn }) {
  const [open, setOpen] = React.useState(false);

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

    const data = {
      email,
      password,
    };

    axios
      .post(`/api/auth/login`, data)
      .then((response) => {
        if (response.data) {
          window.alert(response.data.msg);
          const token = response.data.token;
          localStorage.setItem("MERN_AUTH_TOKEN", JSON.stringify(token));
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
          setIsLoggedIn(true);

          const jobRole = decodedToken.role;
          const encodedid = encodeURIComponent(decodedToken._id);

     
           

          if (jobRole === "Lecturer") {
            navigate(`/TDashbord?$phw=${encodedid}`);
          } else if (jobRole === "Student") {
            navigate(`/SDashbord?$phw=${encodedid}`);
          } else {
            navigate(`/ADashbord?$phw=${encodedid}`);
          }
          
          
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.success === false
        ) {
          window.alert(error.response.data.msg);
        } else {
          console.error("Unexpected error format:", error);
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login_main">
        <div className="login_m2" style={{ backgroundColor:"#e2e0e0e9", width: "100%", height: "40px"}}> </div>
        <div className="login_h3">
          <h2>Login</h2>
        </div>
        <form className="login_label" onSubmit={handleSubmit}>
          <label htmlFor="Username_or_Email"><span style={{ color: "red" }}>*</span>Username</label>
          <br></br>
          <input
            className="Name"
            type="email"
            name="email"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter your Username"
            required
            value={email}
          />
          <br></br>
          <label htmlFor="password"><span style={{ color: "red" }}>*</span>password</label>
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
