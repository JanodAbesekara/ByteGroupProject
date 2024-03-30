import React, { useState, useEffect } from "react";

function ARPreview({ imageUrl }) {
  const [isARSupported, setIsARSupported] = useState(false);

  useEffect(() => {
    if (navigator.xr) {
      setIsARSupported(true);
    }
  }, []);

  return (
    <>
      {isARSupported ? (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-assets>
            <img id="ar-image" src={imageUrl} alt="Profile Image" />
          </a-assets>
          <a-marker preset="hiro">
            <a-image
              src="#ar-image"
              width="1" // Adjust based on image and desired size
              height="1" // Adjust based on image and desired size
            />
          </a-marker>
          {/* Add light sources for better visualization */}
          <a-light type="ambient" color="#fff" intensity="0.4"></a-light>
          <a-light type="directional" color="#fff" intensity="0.8" target="#ar-image"></a-light>
          {/* Add event listeners for user interaction */}
          <a-entity click="handleClick"> 
            {/* Your interactive elements go here */}
          </a-entity>
        </a-scene>
      ) : (
        <p>AR not supported on your device.</p>
      )}
    </>
  );
}

export default ARPreview;
