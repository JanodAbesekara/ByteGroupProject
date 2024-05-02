import React, { useState } from "react";

function Enterquizes({ setQuestions }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestionsLocal] = useState([]);

  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setQuestionCount(count);
    setQuestionsLocal(
      Array.from({ length: count }, () => ({
        Question: "", 
        answers: ["", "", "", ""], 
        correctAnswerIndex: 0,
      }))
    );
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].Question = e.target.value; 
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] =  e.target.value;  // add the ansewr value
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
      <h3 style={{marginBottom: "6px",color: "#1a7873",textTransform: "uppercase",}}>Question count</h3>
      <input
        style={{ 
          width: "50px", 
          height: "30px",
          borderRadius: "5px",
          border: "1px solid gray"
         }}
        placeholder="Enter the Question count"
        type="number"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      {questions.map((question, index) => (
        <div key={index} style={{ marginTop:"20px"}}>
          <h2 style={{
            fontSize: "18px",
            marginBottom: "10px",
            color: "#1f5c73"
          }}>Question {index + 1}</h2>
          <input
            style={{ width: "400px", height: "30px",padding:"10px", borderRadius: "5px", border: "1px solid gray"}}
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
                <h6>{answerIndex +1}</h6>
                <input
                  sx={{ margin: "10px" ,padding:"10px", width: "400px", height: "30px",borderRadius: "5px", border: "1px solid gray"}}
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                />
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <label style={{ color: "#474b4d"}}>Select Correct Answer:</label>
            <select
              style={{ marginLeft: "20px",color: "#474b4d", }}
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
