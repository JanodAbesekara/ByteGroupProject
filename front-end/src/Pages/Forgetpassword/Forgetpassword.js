import React from "react";
import "./Forgetpassword.css";
import axios from "axios";

export default function Forgetpassword() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      window.alert("Email not present !");
      return;
    }

    axios
      .post("/api/auth/forgotpassword", { email })
      .then((res) => {
        console.log(res.data);
        window.alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err.response);
        window.alert(err.response.data.msg);
      });
  };
  return (
    <div>
      <div className="FPdiv">
        <h2>Forget Password</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div style={{ position: "relative" }}>
            <label className="fPlabel" htmlFor="Email">
              <b>
                <span style={{ color: "red" }}>*</span>User Name
              </b>
            </label>
            <input
              className="fPiput"
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your User Name"
            />
          </div>
          <br />
          <br />

          <button className="fPbutton" type="submit">
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
}
