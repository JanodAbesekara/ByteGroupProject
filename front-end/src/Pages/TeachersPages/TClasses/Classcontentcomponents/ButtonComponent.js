import React from 'react';
import './ButtonComponent.css';

function ButtonComponent({ onClick, className }) {
  return (
    <div className={`custom-button ${className}`}>
      <button onClick={onClick}> + Add New</button>
    </div>
  );
}

export default ButtonComponent;