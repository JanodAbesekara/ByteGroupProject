import { useState } from "react";
import React  from 'react'


function InputTimerange() {

  const todayDate = new Date().toISOString().split("T")[0];
   const [timeRange, setTimeRange] = useState(todayDate);


   const handlesubmit = (e) => {
    e.preventDefault();
    console.log(timeRange);
     console.log(todayDate);
   };




  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label>Time Range</label>
        <select onChange={(e)=> setTimeRange(e.target.value)} value={timeRange}>
        <option value={0}>Select Time</option>
        <option value={20}>20minits</option>
        <option value={30}>30minits</option>
        <option value={45}>45minits</option>
        <option value={60}>60minits</option>
        <option value={90}>90minits</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default InputTimerange
