import React, { useState } from 'react';


function InputTimerange({ setTimeRange, setQuizNumber }) {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRangeLocal] = useState(todayDate);
  const [quizNumber, setQuizNumberLocal] = useState(0);

  const handleTimeRangeChange = (e) => {
    setTimeRangeLocal(e.target.value);
    setTimeRange(e.target.value); // Update parent state
  };

  const handleQuizNumberChange = (e) => {
    setQuizNumberLocal(e.target.value);
    setQuizNumber(e.target.value); // Update parent state
  };

  return (
    <div>
      <label>Time Range: </label>
      <select onChange={handleTimeRangeChange} value={timeRange}>
        <option value={0}>Select Time</option>
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
      <br/><br/>
      <label>Select Quizzes: </label>
      <select onChange={handleQuizNumberChange} value={quizNumber}>
        <option value={0}>Select Quizzes</option>
        <option value="1">Quizzes 1</option>
        <option value="2">Quizzes 2</option>
        <option value="3">Quizzes 3</option>
        <option value="4">Quizzes 4</option>
      </select>
    </div>
  );
}

function Enterquizes({ setQuestions }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestionsLocal] = useState([]);

  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setQuestionCount(count);
    setQuestionsLocal(Array.from({ length: count }, () => ({ text: '', answers: ['', '', '', ''], correctAnswerIndex: 0 })));
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = e.target.value;
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = parseInt(e.target.value);
    setQuestionsLocal(updatedQuestions);
    setQuestions(updatedQuestions); // Update parent state
  };

  return (
    <div>
      <h2>Question count</h2>
      <input
        style={{ width: "50px", height: "30px" }}
        placeholder="Enter the Question count"
        type="number"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      {questions.map((question, index) => (
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
      ))}
    </div>
  );
}

export default function CombinedComponent() {
  const [timeRange, setTimeRange] = useState("");
  const [quizNumber, setQuizNumber] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Time Range:", timeRange);
    console.log("Quiz Number:", quizNumber);
    console.log("Questions:", questions);
    // Send data to backend here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputTimerange setTimeRange={setTimeRange} setQuizNumber={setQuizNumber} />
        <Enterquizes setQuestions={setQuestions} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
