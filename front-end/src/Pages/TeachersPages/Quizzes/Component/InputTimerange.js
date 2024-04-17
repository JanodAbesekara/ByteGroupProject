import { useState } from "react";
import React from "react";

function InputTimerange({ setTimeRange ,setQuizNumber}) {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRangeLocal] = useState(todayDate);
  const [quizNumber, setQuizNumberLocal] = useState(0);

  const handleTimeRangeChange = (e) => {
    setTimeRangeLocal(e.target.value);
    setTimeRange(e.target.value); // Update parent state
  };

  const handleQuizNumberChange = (e) => {
    setQuizNumberLocal(e.target.value);
    setQuizNumber(e.target.value); // Update parent state
  };


  return (
    <div>
      <label>Time Range: </label>
      <select onChange={handleTimeRangeChange} value={timeRange}>
        <option value={0}>Select Time</option>
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
      <br/><br/>
      <label>Select Quizzes: </label>
      <select onChange={handleQuizNumberChange} value={quizNumber}>
        <option value={0}>Select Quizzes</option>
        <option value="1">Quizzes 1</option>
        <option value="2">Quizzes 2</option>
        <option value="3">Quizzes 3</option>
      </select>
    </div>
  );
}

export default InputTimerange;
