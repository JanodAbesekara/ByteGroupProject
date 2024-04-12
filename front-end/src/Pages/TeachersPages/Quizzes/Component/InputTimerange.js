import { useState } from "react";
import React from "react";

function InputTimerange() {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRange] = useState(todayDate);
  const [quisenumber, setquisenumber] = useState(0);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(timeRange);
    console.log(todayDate);
    console.log(quisenumber);
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label>Time Range :- </label>
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value={0}>Select Time</option>
          <option value={20}>20minits</option>
          <option value={30}>30minits</option>
          <option value={45}>45minits</option>
          <option value={60}>60minits</option>
          <option value={90}>90minits</option>
        </select>
        <br></br>
        <br></br>
        <label>Select Quizzes :- </label>
        <select onChange={(e) => setquisenumber(e.target.value)}>
          <option value={0}>Select Quizzes</option>
          <option value="1">Quizzes 1</option>
          <option value="2">Quizzes 2</option>
          <option value="3">Quizzes 3</option>
          <option value="4">Quizzes 4</option>
        </select>

        <button
          type="submit"
          style={{ position: "relative", top: "30px", right: "800px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputTimerange;
