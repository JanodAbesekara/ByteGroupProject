import React, { useState } from 'react';

function TickButton() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        {isChecked ? 'Access given' : 'No access'}
      </label>
   
    </div>
  );
}

export default TickButton;