import React from "react";
import "./Forgetpassword.css";

export default function Forgetpassword() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      window.alert("Email not present !");
      return;
    }
  };

  return (
    <div className="FPdiv">
      <h2>Forget Password</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div style={{position:"relative"}}>

        <label className="fPlabel" htmlFor="Email">
          <b>User Name</b>
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
  );
}
