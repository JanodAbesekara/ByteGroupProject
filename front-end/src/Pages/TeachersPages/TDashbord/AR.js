import React, { useState, useEffect } from "react";

function ARPreview({ peopleData }) {
  const [isARSupported, setIsARSupported] = useState(false);

  useEffect(() => {
    if (navigator.xr && peopleData) { // Check if peopleData is defined
      setIsARSupported(true);
    }
  }, [peopleData]);

  const createMarkerEntities = () => {
    if (!peopleData) return [];

    return peopleData.map((person) => (
      <a-marker key={person.id} type="pattern" url={person.markerUrl}>
        {/* Add content inside the marker */}
        <a-entity position="0 0 0">
          <a-image src={person.avatarUrl} width="1" height="1"></a-image>
        </a-entity>
      </a-marker>
    ));
  };

  return (
    <>
      {isARSupported ? (
        <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
          <a-assets>
            {/* Define markers based on peopleData */}
            {peopleData && createMarkerEntities()}
          </a-assets>
          {/* Add pre-created markers */}
          {peopleData && createMarkerEntities()}
          {/* Add elements to display details on marker found (replace with your UI components) */}
          <a-entity id="details-entity" visible="false">
            <h1>Person Found</h1>
            <p>Name: {/* Dynamically insert name from personData */}</p>
            <p>Title: {/* Dynamically insert title from personData */}</p>
            {/* Add more details as needed */}
          </a-entity>
        </a-scene>
      ) : (
        <p>AR not supported on your device.</p>
      )}
    </>
  );
}

export default ARPreview;
