import React, { useState } from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";

function Component1({ subject, teachermail, Feedmedium }) {
  const [value, setValue] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [feedtext, setFeedtext] = useState("");

  let studentemail;
  if (localStorage.getItem("MERN_AUTH_TOKEN")) {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    studentemail = decodedToken.email;
  } else {
    studentemail = " ";
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const isconform = window.confirm("Are you sure to submit the feedback?");

    if (isconform) {
      const data = {
        feedtext,
        value,
        studentemail,
        teacheremail: teachermail,
        feedSubject: subject,
        feedmedium: Feedmedium,
      };

      Axios.post("/api/auth/feedbackadd", data)
        .then((response) => {
          if (response.data) {
            window.alert(response.data.msg);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <div>
        {" "}
        <button
          onClick={() => {
            setClicked(!clicked);
          }}
          style={{
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            padding: "3px",
            color: "#fff",
            width: "auto",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          }}
        >
          Add Feedbacks
        </button>
        {clicked && (
          <form
            style={{ width: "70%", display: "flex", flexDirection: "column" }}
          >
            <lebel
              style={{
                color: "#000080",
                marginBottom: "13px",
                marginTop: "10px",
                fontSize: "14px",
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              Enter your feedback
            </lebel>
            <input
              type="text"
              style={{
                height: "60px",
                paddingTop: "10px",
                paddingBottom: "60px",
                paddingLeft: "8px",
                width: "auto",
                border: "1px solid gray",
              }}
              placeholder="Type here.."
              onChange={(e) => setFeedtext(e.target.value)}
            />
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>

            <button
              type="submit"
              onClick={handlesubmit}
              style={{
                padding: "2px",
                borderRadius: "3px",
                border: "1px solid gray",
                width: "60px",
              }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Component1;
