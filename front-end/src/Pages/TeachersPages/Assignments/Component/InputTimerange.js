import { useState } from "react";
import React from "react";

function InputTimerange({ setTimeRange }) {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRangeLocal] = useState(todayDate);
  const [disable,setDisable] = useState(true);
  
  const handleTimeRangeChange = (e) => {
    setDisable(false);
    setTimeRangeLocal(e.target.value);
    setTimeRange(e.target.value); // Update parent state
  };



  

  return (
    <div>
      <label style={{color: "#7c807d"}}><span style={{color:"red"}}>*</span>Time Range: </label>

      <select style={{
        borderRadius: "5px",
        color: "#4f5251"
      }}onChange={handleTimeRangeChange} value={timeRange} >
        {disable && <option>Select Time</option> }
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
      
    </div>
  );
}

export default InputTimerange;
