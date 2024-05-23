import React, { useState } from 'react';
import ButtonComponent from './Classcontentcomponents/UploadBox';
import UploadBox from './Classcontentcomponents/ButtonComponent';



function  Classcontent() {
  const [components, setComponents] = useState([]);

  const handleClick = () => {
    setComponents([...components, <UploadBox key={components.length} className="UploadBox" />]);
  }

  return (
    <div className="App">
      <div className="container">
        {components}
      </div>
      <div className="container">
        <ButtonComponent onClick={handleClick} className="ButtonComponent" />
      </div>
    </div>
  );
}

export default Classcontent;