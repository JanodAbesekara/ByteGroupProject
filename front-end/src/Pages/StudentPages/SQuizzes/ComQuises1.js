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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State for tracking current question index

  useEffect(() => {
    let timer;
    if (countdownStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (remainingTime === 0 && countdownStarted) {
      handleSubmit(); // Automatically submit when time is over
    }
    return () => clearInterval(timer);
  }, [countdownStarted, remainingTime]);

  const startQuiz = async () => {
    const timeRangeFromBackend = quisedata.TimeRanges;
    setTimeRange(timeRangeFromBackend);
    setCorrectAnswers(
      quisedata.question.map((question) => question.correctAnswerIndex)
    );
    setRemainingTime(timeRangeFromBackend * 60 * 1000);
    setCountdownStarted(true);
    setQuizStarted(true);
    setSubmitButton(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = () => {
    setSubmitButton(true);
    const score = checkAnswers();
    window.alert(`Your score is ${score} %`);
    setQuizStarted(false);
    setCountdownStarted(false);
    setShowContent(false);

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

  // Function to handle next question
  const nextQuestion = () => {
    if (currentQuestionIndex < quisedata.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }


  };

  const resetNotification = () => {
    // setTriggerNotification(false);
    setCountdownStarted(false);
    setShowContent(false);



  };

  return (
    <>
      <div>
        {!quizStarted && (
          <button
            onClick={() => setShowContent(!showContent)}
            style={{ marginTop: "10px", marginLeft: "5px" }}
          >
            {showContent ? "Hide Content" : "Show Content"}
          </button>
        )}

        {showContent && (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "35px",
              border: "none",
              borderRadius: "6px",
              color: "#000",
              width: "80%",
              margin: "3% 10%",
            }}
          >
            {!quizStarted && ( // Render start button if quiz has not started
              <button onClick={startQuiz} style={{ marginTop: "3px" }}>
                Start Quiz
              </button>
            )}

            <div>
              {showContent && quizStarted && (
                <p
                  style={{
                    float: "right",
                    backgroundColor: "#ada9a8",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px",
                    marginBottom: "10px",
                  }}
                >
                  Remaining Time:{" "}
                  <span style={{ color: "red" }}>{formatTime()}</span>
                </p>
              )}

              {quizStarted && ( // Render quiz content if quiz has started
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div
                    key={currentQuestionIndex}
                    style={{
                      paddingTop: "40px",
                    }}
                  >
                    <p>
                      {currentQuestionIndex + 1}.{" "}
                      {quisedata.question[currentQuestionIndex].Question}
                    </p>
                    <ul style={{ marginTop: "20px", marginBottom: "20px" }}>
                      {quisedata.question[currentQuestionIndex].answers.map(
                        (answer, aIndex) => (
                          <li key={aIndex} style={{ margin: "10px" }}>
                            <input
                              type="radio"
                              id={`answer_${currentQuestionIndex}_${aIndex}`}
                              name={`answer_${currentQuestionIndex}`}
                              value={aIndex}
                              onChange={() => {
                                const newAnswers = [...answers];
                                newAnswers[currentQuestionIndex] = aIndex;
                                setAnswers(newAnswers);
                              }}
                              checked={answers[currentQuestionIndex] === aIndex}
                            />
                            <label
                              htmlFor={`answer_${currentQuestionIndex}_${aIndex}`}
                            >
                              {answer}
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Navigation buttons */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      style={{
                        margin: "4px",
                        padding: "2px",
                      }}
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      onClick={nextQuestion}
                      disabled={
                        currentQuestionIndex === quisedata.question.length - 1
                      }
                      style={{
                        margin: "4px",
                        padding: "2px",
                      }}
                    >
                      {">"}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!submitButton || remainingTime === 0}
                    onClick={handleSubmit}
                    style={{
                      width: "auto",
                      margin: "3px",
                      padding: "3px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#103457",
                      color: "#fff",
                      boxShadow: "0px 2px 2px 0px",
                    }}
                  >
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
