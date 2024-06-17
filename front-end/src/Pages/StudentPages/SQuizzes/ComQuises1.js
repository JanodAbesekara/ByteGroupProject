import React, { useState, useEffect } from "react";

function ComQuizes({ quisedata }) {
  const [answers, setAnswers] = useState([]); // State for storing selected answers
  const [submitButton, setSubmitButton] = useState(false); // State for controlling submit button
  const [remainingTime, setRemainingTime] = useState(0); // State for remaining time
  const [showContent, setShowContent] = useState(false); // State for controlling content visibility
  const [quizStarted, setQuizStarted] = useState(false); // State for controlling quiz start 
  const [timeRange, setTimeRange] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]); // State for correct answers

  useEffect(() => {
    let timer;
    if (countdownStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (remainingTime === 0 && countdownStarted) {
      handleSubmmit(); // Automatically submit when time is over
    }
    return () => clearInterval(timer);
  }, [countdownStarted, remainingTime]);

  const startQuiz = async () => {
    const timeRangeFromBackend = quisedata.TimeRanges;
    setTimeRange(timeRangeFromBackend);
    setCorrectAnswers(quisedata.question.map((question) => question.correctAnswerIndex));
    setRemainingTime(timeRangeFromBackend * 60 * 1000);
    setCountdownStarted(true);
    setSubmitButton(true);
    setQuizStarted(true); // Set quiz started to true when start button is clicked
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmmit = () => {
    setSubmitButton(true);
    const score = checkAnswers();
    window.alert(`Your score is ${score} %`);
    window.location.reload();
  };

  const checkAnswers = () => {
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }
    return (score / correctAnswers.length) * 100;
  };

  return (
    <>
      <div style={{marginTop:"20px"}}>
        <button onClick={() => setShowContent(!showContent)} style={{marginTop:"20px"}}>
          {showContent ? "Hide Content" : "Show Content"}
        </button>

        {showContent && (
          <div style={{backgroundColor:"white",padding:"20px"}}>
            {!quizStarted && ( // Render start button if quiz has not started
              <button onClick={startQuiz} style={{marginTop:"20px",marginBottom:"30px"}}>Start Quiz</button>
            )}

            <div>
              <p>Time: {formatTime()}</p>

              {quizStarted && ( // Render quiz content if quiz has started
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  {quisedata.question.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      style={{
                        backgroundColor: "#C3B091",
                        borderRadius: "20px",
                        padding: "40px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginInline: "80px",
                      }}
                    >
                      <p>
                        {qIndex + 1}.{question.Question}
                      </p>
                      <ul style={{ marginTop: "20px", marginBottom: "20px" }}>
                        {question.answers.map((answer, aIndex) => (
                          <li key={aIndex} style={{ margin: "10px" }}>
                            <input
                              type="radio"
                              id={`answer_${qIndex}_${aIndex}`}
                              name={`answer_${qIndex}`}
                              value={aIndex}
                              onChange={() => {
                                const newAnswers = [...answers];
                                newAnswers[qIndex] = aIndex;
                                setAnswers(newAnswers);
                              }}
                            />
                            <label htmlFor={`answer_${qIndex}_${aIndex}`}>
                              {answer}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button type="submit" disabled={!submitButton || remainingTime === 0} onClick={handleSubmmit}>
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ComQuizes;
