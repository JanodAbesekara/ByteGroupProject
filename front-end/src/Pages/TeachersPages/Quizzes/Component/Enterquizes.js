import { margin } from "@mui/system";
import React, { useState } from "react";

function Enterquizes({ setQuestions }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestionsLocal] = useState([]);

  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setQuestionCount(count);
    setQuestionsLocal(
      Array.from({ length: count }, () => ({
        Question: "", // Changed from 'text' to 'Question'
        answers: ["", "", "", ""], // Lowercased 'answers'
        correctAnswerIndex: 0,
      }))
    );
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].Question = e.target.value; // Changed from 'text' to 'Question'
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] =
      e.target.value.toLowerCase(); // Lowercased 'answers'
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = parseInt(
      e.target.value
    );
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  return (
    <div >
      <h2>Question count</h2>
      <input
        style={{ width: "50px", height: "30px" }}
        placeholder="Enter the Question count"
        type="number"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      {questions.map((question, index) => (
        <div key={index} style={{ marginTop:"20px"}}>
          <h2>Question {index + 1}</h2>
          <input
            style={{ width: "400px", height: "30px",padding:"10px" }}
            placeholder="Enter the Question"
            value={question.Question}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          <h3 style={{marginTop:"20px"}}>Answers</h3>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <input
                  sx={{ margin: "10px" ,padding:"10px", width: "400px", height: "30px"}}
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                />
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <label>Select Correct Answer:</label>
            <select
              style={{ marginLeft: "20px" }}
              value={question.correctAnswerIndex}
              onChange={(e) => handleCorrectAnswerChange(index, e)}
            >
              {question.answers.map((answer, answerIndex) => (
                <option key={answerIndex} value={answerIndex}>
                  Answer {answerIndex + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Enterquizes;
