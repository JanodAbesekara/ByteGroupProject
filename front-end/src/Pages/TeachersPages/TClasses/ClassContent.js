import React, { useEffect, useState } from 'react';

function ClassContent() {
    const [count, setCount] = useState(1);

    const handleCount = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        console.log("Lecture", count);
    }, [count]);

    return (
        <>
        <div style={{width:"100%",height:"20px"}}>
        <button onClick={handleCount} style={{}}>Increase Lecture</button>
        </div>
            
            {[...Array(count)].map((_, index) => (
                <div key={index} style={{ justifyContent: "center", alignContent: "center", display: "flex" }}>
                    <div style={{ width: "90%", height: "300px", backgroundColor: "#CADCD9", marginTop: "50px", marginBottom: "50px", borderRadius: "20px" }}>
                        <h5>Lecture {index + 1}</h5>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ClassContent;
