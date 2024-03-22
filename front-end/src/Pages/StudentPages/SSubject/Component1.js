import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import io  from  "socket.io-client";



function Component1() {
 

  useEffect(() => {
    const socket = io(`http://localhost:4000`);
    console.log(socket);

  }, []);
  
  const [value, setValue] = useState(2);

  return (
    <div>
      <div>
        <form>
            
          <h2> Enter your feedback</h2>
          <input
            type="text"
            style={{ height: "80px", paddingTop: "10px",paddingBottom:"60px" ,paddingLeft:"8px",paddingRight:"8px",width:"250px"}}
            placeholder="type hear.."
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
        </form>
      </div>
    </div>
  );
}

export default Component1;
