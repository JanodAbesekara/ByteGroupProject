import React, { useState } from "react";

function EnterAssignment({ setQuestions }) {
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
      e.target.value; // add the ansewr value
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
    <div style={{width:"auto", display:"flex", flexDirection:"column"}}>
      <p
        style={{
          marginBottom: "6px",
          color: "#337AB7",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Question count
      </p>
      <input
        style={{
          width: "50px",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid gray",
          display:"flex"
        }}
        placeholder="Enter the Question count"
        type="number"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      {questions.map((question, index) => (
        <div key={index} style={{ marginTop: "20px",display:"flex", flexDirection:"column", width:"auto" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "10px",
              color: "#337AB7",
            }}
          >
            Question {index + 1}
          </h2>
          <input
            style={{
              height: "30px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              width:"auto",
            }}
            placeholder="Enter the Question"
            value={question.Question}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          <h3 style={{ marginTop: "20px", color:"#337AB7" }}>Answers</h3>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                style={{ paddingTop: "10px", paddingBottom: "10px", width:"auto", display:"flex", flexDirection:"column" }}
              >
                <input
                  style={{
                    margin: "5px 0",
                    padding: "5px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid gray",
                    width:"auto",
                    display:"flex"

                  }}
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                />
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <label style={{ color: "#474b4d" }}>Select Correct Answer:</label>
            <select
              style={{ marginLeft: "20px", color: "#474b4d" }}
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

export default EnterAssignment;
