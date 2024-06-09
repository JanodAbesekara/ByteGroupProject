import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

function AssignmentComponent({ assignmentData }) {
  const subjectKey = assignmentData._id;

  const getInitialState = (key, defaultValue) => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  };

  const [answers, setAnswers] = useState(() => getInitialState(`${subjectKey}_answers`, []));
  const [submitButton, setSubmitButton] = useState(() => getInitialState(`${subjectKey}_submitButton`, false));
  const [remainingTime, setRemainingTime] = useState(() => getInitialState(`${subjectKey}_remainingTime`, 0));
  const [showContent, setShowContent] = useState(false);
  const [assignmentStarted, setAssignmentStarted] = useState(() => getInitialState(`${subjectKey}_assignmentStarted`, false));
  const [timeRange, setTimeRange] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(() => getInitialState(`${subjectKey}_countdownStarted`, false));
  const [correctAnswers, setCorrectAnswers] = useState(() => getInitialState(`${subjectKey}_correctAnswers`, []));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => getInitialState(`${subjectKey}_currentQuestionIndex`, 0));
  const [marks, setMarks] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(() => getInitialState(`${subjectKey}_assignmentSubmitted`, false));

  useEffect(() => {
    let timer;
    if (countdownStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1000;
          localStorage.setItem(`${subjectKey}_remainingTime`, JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
    } else if (remainingTime === 0 && countdownStarted) {
      handleSubmit(); // Automatically submit when time is over
    }
    return () => clearInterval(timer);
  }, [remainingTime, countdownStarted]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_answers`, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_submitButton`, JSON.stringify(submitButton));
  }, [submitButton]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_assignmentStarted`, JSON.stringify(assignmentStarted));
  }, [assignmentStarted]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_countdownStarted`, JSON.stringify(countdownStarted));
  }, [countdownStarted]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_correctAnswers`, JSON.stringify(correctAnswers));
  }, [correctAnswers]);

  useEffect(() => {
    localStorage.setItem(`${subjectKey}_currentQuestionIndex`, JSON.stringify(currentQuestionIndex));
  }, [currentQuestionIndex]);

  useEffect(() => {
    // setAssignmentSubmitted(false);
    localStorage.setItem(`${subjectKey}_assignmentSubmitted`, JSON.stringify(assignmentSubmitted));
  }, [assignmentSubmitted]);

  const startAssignment = async () => {
    const time = assignmentData.TimeRanges;
    setTimeRange(time);
    const correctAnswers = assignmentData.question.map((question) => question.correctAnswerIndex);
    setCorrectAnswers(correctAnswers);
    setRemainingTime(parseInt(time) * 60 * 1000);
    setCountdownStarted(true);
    setSubmitButton(true);
    setAssignmentStarted(true);
    setShowTime(true);

    localStorage.setItem(`${subjectKey}_remainingTime`, JSON.stringify(parseInt(time) * 60 * 1000));
    localStorage.setItem(`${subjectKey}_correctAnswers`, JSON.stringify(correctAnswers));
    localStorage.setItem(`${subjectKey}_countdownStarted`, JSON.stringify(true));
    localStorage.setItem(`${subjectKey}_submitButton`, JSON.stringify(true));
    localStorage.setItem(`${subjectKey}_assignmentStarted`, JSON.stringify(true));
    console.log(assignmentData);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = () => {
    const confirmation = window.confirm("Have you completed successfully?");
    if(confirmation){
    setSubmitButton(false);
    const score = checkAnswers();
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;
    const userName =  (decodedToken.fname + decodedToken.lname);
    const subject = assignmentData.TeacherSubject;
    const tEmail = assignmentData.TeacherEmail;
    const medium = assignmentData.submedium;


    const mark = {
      ...marks,
      email: userEmail,
      subject: subject,
      score: score,
      teacherEmail: tEmail,
      medium: medium,
      name: userName,

    };
 
    
    axios
      .post(`/api/assignment/grade`, mark)
      .then((response) => {
        console.log(response.data.msg);
        alert(response.data.msg);

      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });

    // Clear localStorage on submission
    localStorage.removeItem(`${subjectKey}_remainingTime`);
    localStorage.removeItem(`${subjectKey}_answers`);
    localStorage.removeItem(`${subjectKey}_submitButton`);
    localStorage.removeItem(`${subjectKey}_assignmentStarted`);
    localStorage.removeItem(`${subjectKey}_countdownStarted`);
    localStorage.removeItem(`${subjectKey}_correctAnswers`);
    localStorage.removeItem(`${subjectKey}_currentQuestionIndex`);

    setRemainingTime(0);
    setAssignmentSubmitted(true);
    localStorage.setItem(`${subjectKey}_assignmentSubmitted`, JSON.stringify(true));
    setShowTime(false);

    // Refresh the page to reflect the changes
    window.location.reload();
    }
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
    if (currentQuestionIndex < assignmentData.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      <div
        style={{
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              backgroundColor: "#27ae60",
              borderRadius: "5px",
              padding: "3px 8px",
            }}
          >
            {assignmentData.TeacherSubject}
          </p>
        </div>
        <div>
          <p style={{
              padding: "3px 8px",
              color:"#0d09f6"
            }}
          >
            {assignmentData.submedium}</p>
        </div>
      </div>
      

      <div>
        {!showContent && !assignmentSubmitted && (
          <div>
            <p
        style={{
          padding: "3px 8px",
          color:"#000"
        }}
      >
        Allocated Time : {assignmentData.TimeRanges} minutes
      </p>
        <button
          onClick={() => {setShowContent(!showContent);}}
          style={{ 
            marginLeft:"6px",
            marginTop: "5px",
            backgroundColor:"ash",
            border:"none",
            borderRadius:"3px",
            width:"16%",
            cursor:"pointer"
          }}
        >
          Show Content
        </button>
        </div>

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
            {!assignmentStarted && ( // Render start button if assignment has not started
              <button
                onClick={startAssignment}
                style={{ marginTop: "3px" }}
              >
                Start Assignment
              </button>
            )}

            <div>
            {showTime && (
              <p
                style={{
                  float: "right",
                  backgroundColor: "#ada9a8",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "4px",
                }}
              >
                Remaining Time: <span style={{ color: "red" }}>{formatTime()}</span>
              </p>
              )}

              {assignmentStarted && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div style={{ paddingTop: "40px" }}>
                    <p>
                      {currentQuestionIndex + 1}.{" "}
                      {assignmentData.question[currentQuestionIndex].Question}
                    </p>
                    <ul style={{ marginTop: "20px", marginBottom: "20px" }}>
                      {assignmentData.question[currentQuestionIndex].answers.map(
                        (answer, aIndex) => (
                          <li key={aIndex} style={{ margin: "10px" }}>
                            <input
                              type="radio"
                              id={`answer_${currentQuestionIndex}_${aIndex}`}
                              name={`answer_${currentQuestionIndex}`}
                              value={aIndex}
                              onChange={() => {
                                const newAnswers = [...answers];
                                newAnswers[currentQuestionIndex] = aIndex + 1;
                                setAnswers(newAnswers);
                              }}
                              checked={answers[currentQuestionIndex] === aIndex + 1}
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
                        currentQuestionIndex === assignmentData.question.length - 1
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
    </div>
  );
}

export default AssignmentComponent;
