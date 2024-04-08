import React from 'react'

function InputTimerange() {
  return (
    <div>
      <form>
        <label>Time Range</label>
        <select>Time Range</select>
        <option value={20}>20minits</option>
        <option value={30}>30minits</option>
        <option value={45}>45minits</option>
        <option value={60}>60minits</option>
        <option value={90}>90minits</option>
      </form>
    </div>
  )
}

export default InputTimerange
