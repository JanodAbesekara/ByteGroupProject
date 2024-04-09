import React, { useState } from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";

function Component1() {
  const [value, setValue] = useState(1);
  const [feedtext, setFeedtext] = useState("");

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const studentemail = jwtDecode(token).email;

  const handlesubmit = (e) => {
    e.preventDefault();

    const data = {
      feedtext,
      value,
      studentemail,
      teacheremail: "janodabesekara91@gmail.com",
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
  };

  return (
    <div>
      <div>
        <form>
          <h2> Enter your feedback</h2>
          <input
            type="text"
            style={{
              height: "80px",
              paddingTop: "10px",
              paddingBottom: "60px",
              paddingLeft: "8px",
              paddingRight: "8px",
              width: "250px",
            }}
            placeholder="type hear.."
            onChange={(e) => setFeedtext(e.target.value)}
          />
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Reating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>

          <button type="submit" onClick={handlesubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Component1;
