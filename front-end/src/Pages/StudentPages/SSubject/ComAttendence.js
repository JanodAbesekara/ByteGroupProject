import React, { useState, forwardRef, useImperativeHandle } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ComAttendence = forwardRef(({ teachermail, subject, medium }, ref) => {
  let firstname;
  let lastname;

  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    firstname = decodedToken.firstname;
    lastname = decodedToken.lastname;
  } else {
    firstname = " ";
    lastname = " ";
  }

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);
    try {
      const token = localStorage.getItem("MERN_AUTH_TOKEN");
      const decodedToken = jwtDecode(token);
      const response = await axios.post("/api/user/studentattendence", {
        studentnemail: decodedToken.email,
        studentname: firstname + " " + lastname,
        subject: subject,
        teachetmail: teachermail,
        medium: medium,
      });
      window.alert(response.data.msg);
    } catch (error) {
      window.alert(error.response.data.msg);
    } finally {
      setButtonDisabled(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleClick: () => {
      handleSubmit(new Event("submit"));
    },
  }));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={buttonDisabled}
          style={{ visibility: "hidden" }}
        >
          Attend to lecture
        </button>
      </form>
    </div>
  );
});

export default ComAttendence;
