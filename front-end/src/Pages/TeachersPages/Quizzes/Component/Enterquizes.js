import React, { useState } from 'react';

function Enterquizes() {
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setQuestionCount(count);
    setQuestions(Array.from({ length: count }, () => ({ text: '', answers: ['', '', '', ''], correctAnswerIndex: 0 })));
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = parseInt(e.target.value);
    setQuestions(updatedQuestions);
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div key={index}>
        <h2>Question {index + 1}</h2>
        <input
          style={{ width: "400px", height: "30px" }}
          placeholder="Enter the Question"
          value={question.text}
          onChange={(e) => handleQuestionChange(index, e)}
        />
        <h3>Answers</h3>
        <ul>
          {question.answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <input
                placeholder={`Enter answer ${answerIndex + 1}`}
                value={answer}
                onChange={(e) => handleAnswerChange(index, answerIndex, e)}
              />
            </li>
          ))}
        </ul>
        <div>
          <label>Select Correct Answer:</label>
          <select value={question.correctAnswerIndex} onChange={(e) => handleCorrectAnswerChange(index, e)}>
            {question.answers.map((answer, answerIndex) => (
              <option key={answerIndex} value={answerIndex}>Answer {answerIndex + 1}</option>
            ))}
          </select>
        </div>
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <div style={{ width: "800px", border: "2px solid black", marginTop: "100px", padding: "50px" }}>
        <h2>Question count</h2>
        <input
          style={{ width: "50px", height: "30px" }}
          placeholder="Enter the Question count"
          type="number"
          value={questionCount}
          onChange={handleQuestionCountChange}
        />
        {renderQuestions()}
      </div>
    </div>
  );
}

export default Enterquizes;
