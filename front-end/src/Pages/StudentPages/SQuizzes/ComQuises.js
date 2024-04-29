import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ComQuises() {


  const [quizzes, setQuizzes] = useState([]);
  const [timeRange, setTimeRange] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submitbutton, setSubmit] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    let timer;
    if (countdownStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (remainingTime === 0 && countdownStarted) {
      handlesubmmit(); // Automatically submit when time is over
    }
    return () => clearInterval(timer);
  }, [remainingTime, countdownStarted, answers, correctAnswers]);

  const startquise = async () => {
    try {
      const response = await axios.get(`/api/Quise/getQuise`);
      const quises = response.data;
      const filteredQuizes = quises.filter(
        (quise) =>
          quise.TeacherEmail === "teacher@example.com" &&
          quise.TeacherSubject === "Mathematics" &&
          quise.QuizeNumber === 1
      );
      const timeRangeFromBackend = filteredQuizes[0].TimeRanges;
      setTimeRange(timeRangeFromBackend);
      setCorrectAnswers(
        filteredQuizes[0].question.map(
          (question) => question.correctAnswerIndex
        )
      );
      setRemainingTime(timeRangeFromBackend * 60 * 1000);
      setCountdownStarted(true);
      setQuizzes(filteredQuizes);
      setButtonClicked(true);
      setSubmit(false); // Set submit to true when starting a new quiz
    } catch (error) {
      console.error("Error fetching quizzes: ", error);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlesubmmit = (e) => {
    if (e) e.preventDefault(); // Prevent default form submission
    console.log("answers", answers);
    setSubmit(true);
    const score = checkanwers();
    window.alert(`Your score is ${score} %`);
    navigate("/SQuizzes");
  };

  const checkanwers = () => {
    let score = 0;
    console.log("corrected", correctAnswers);
    for (let i = 0; i < correctAnswers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }
    return (score / correctAnswers.length) * 100;
  };

  return (
    <div>
      
      <div
        style={{
          float: "right",
          margin: "50px 100px",
          boxShadow: "2px 4px 8px 0.5px black",
          padding: "10px",
        }}
      >
        <p>Time: {formatTime()}</p>
      </div>
      <button onClick={startquise} disabled={buttonClicked}>
        Start
      </button>
      <div>
        <div>
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                  fontSize: "35px",
                }}
              >
                <b>{quiz.TeacherSubject}</b>
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "15px",
                  marginBottom: "50px",
                }}
              >
                Quiz Number: {quiz.QuizeNumber}
              </p>

              <div>
                <form onSubmit={handlesubmmit}>
                  {quiz.question.map((question, qIndex) => (
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
                        {" "}
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
                                newAnswers[qIndex] = aIndex + 1;
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
                  <button
                    type="submit"
                    onClick={handlesubmmit}
                    disabled={submitbutton || remainingTime === 0}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComQuises;
