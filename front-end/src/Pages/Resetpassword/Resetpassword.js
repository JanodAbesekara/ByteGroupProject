import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Resetpassword.css';
import {Input, Space } from 'antd';

export default function Resetpassword() {
  const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop();
  const [passwordN, setPasswordN] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = jwtDecode(token);

    axios.post("/api/auth/resetpassword", { email, newPassword: passwordN, confirmNewPassword: passwordC })
      .then(res => {
        window.alert(res.data.msg);
        console.log(res.data);
      }).catch(err => {
        // Use setError instead of width.alert
        window.alert(err.response.data.msg);
        console.log(err.response);
      });
  }

  useEffect(() => {
    if (token) {
      axios.get(`/api/auth/verifyToken?token=${token}`)
        .then(res => {
          console.log(res);
          setIsTokenVerified(true);
        })
        .catch(err => {
          console.log(err.response);
          setError(err.response.data.msg);
        });
    }
  }, [token]);

  return (
    <div>
      {isTokenVerified ?
        <div className='RPdiv'>
          <h2>Reset </h2>
        
            <h2>Password</h2>
          <label className='RPlabel1' htmlFor="New Password"><b>NewPassword</b></label>
          <br /><br /><br></br>

          <Space direction="vertical" className='space'>
                <Input.Password
                  className='RPiput1'
                  type='password'
                  name='passwordN'
                  placeholder='Enter your new password'
                  autoComplete="off"
                  required
                  value={passwordN}
                  onChange={(e) => setPasswordN(e.target.value)}
                  style={{ width: '250px', height: '50px', marginTop:'10px', fontSize:'15px',}}
                  />
               </Space>
         
          <br /><br />
          <label className='RPlabel2' htmlFor="Confirm Password"><b>ConfirmPassword</b></label>


          <Space direction="vertical" className='space'>
                <Input.Password
                  className='RPiput2'
                  type='password'
                  name='passwordC'
                  value={passwordC}
                  required
                  placeholder='Re-enter your password'
                  autoComplete="off"
                  onChange={(e) => setPasswordC(e.target.value)}
                  style={{ width: '250px', height: '50px', marginTop:'10px', fontSize:'15px', }}
                  />
               </Space>
            
      
          <br /><br />
          <button className='RPbutton' variant="contained" type='submit' onClick={handleSubmit}>ResetPassword</button>
        </div>
        :
        <h2 className='RPver'>Verifying Token, Please Wait...</h2>
      }
      {/* Display error message */}
      {error && <p>{error}</p>}
    </div>
  );
}
