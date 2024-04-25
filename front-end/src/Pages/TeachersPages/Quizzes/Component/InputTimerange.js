import { useState } from "react";
import React from "react";

function InputTimerange({ setTimeRange ,setQuizNumber}) {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRangeLocal] = useState(todayDate);
  const [quizNumber, setQuizNumberLocal] = useState(0);

  const handleTimeRangeChange = (e) => {
    setDisable1(false);
    setTimeRangeLocal(e.target.value);
    setTimeRange(e.target.value); // Update parent state
  };

  const handleQuizNumberChange = (e) => {
    setDisable2(false);
    setQuizNumberLocal(e.target.value);
    setQuizNumber(e.target.value); // Update parent state
  };

  const [disable1,setDisable1] = useState(true);
  const [disable2,setDisable2] = useState(true);

  return (
    <div>
      <label style={{color: "#232424"}}>Time Range: </label>

      <select style={{
        borderRadius: "5px",
        color: "#4f5251"
      }}onChange={handleTimeRangeChange} value={timeRange} >
        {disable1 && <option>Select Time</option> }
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
      <br/><br/>
      <label style={{color: "#232424"}}>Select Quizzes: </label>
      <select 
      style={{
        borderRadius: "5px",
        color: "#4f5251"
      }}onChange={handleQuizNumberChange} value={quizNumber}>
      {disable2 && <option>Select Quizzes</option> }
        <option value="1">Quizzes 1</option>
        <option value="2">Quizzes 2</option>
        <option value="3">Quizzes 3</option>
      </select>
    </div>
  );
}

export default InputTimerange;
