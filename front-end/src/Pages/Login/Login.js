import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Login.css';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Forgetpassword from "../Forgetpassword/Forgetpassword";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: "hidden",
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    overflow: "hidden",
  },
  '& .MuiPaper-root': {
    overflowY: "hidden"
  }
}));

export default function Login({ setUser, setIsLoggedIn }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <div className="login_main">
        <div className="login_m2"> </div>
        <div className="login_h3">
          <h2>Login</h2>
        </div>
        <form className="login_label" onSubmit={handleSubmit}>
          <label htmlFor="Username_or_Email">Username</label>
          <br></br>
          <input
            className='Name'
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Username"
            required
            value={email}
          />
          <br></br>
          <label htmlFor="password">password</label>
          <br></br>
          <input
            type='password'
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="log_rem">
            <button type="submit" value="Login">Login</button>
            <br></br>
            <br></br>
            <h2>
              Forgot password? <Link variant="outlined" onClick={handleClickOpen}>Click here to reset</Link>
            </h2>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}>
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

    </div>
  );
}
