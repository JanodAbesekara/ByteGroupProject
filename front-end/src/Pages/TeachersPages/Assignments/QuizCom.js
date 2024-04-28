import React, { useState } from 'react';


function InputTimerange({ setTimeRange, setQuizNumber }) {
  const todayDate = new Date().toISOString().split("T")[0];
  const [timeRange, setTimeRangeLocal] = useState(todayDate);

  const [change, setChange] = useState(false);


  const handleTimeRangeChange = (e) => {
    setTimeRangeLocal(e.target.value);
    setTimeRange(e.target.value); // Update parent state
    setChange(true);
  };



  return (
    <div style={{marginTop:"20px"}}>
      <label style={{textTransform:"uppercase", color:"#3746ab"}}><span style={{color:"red"}}>*</span>Time Range: </label>
      <select onChange={handleTimeRangeChange} value={timeRange}>
        {change && <option>Select Time</option> }
        <option value={20}>20 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
    </div>
  );
}

function EnterAssignment({ setQuestions }) {
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
      <h2 style={{margin:"17px 0px", backgroundColor:"#3746ab", width:"205px", textAlign:"center", borderRadius:"5px", color:"#fff",height:"35px", paddingTop:"3px"}}>Question Count</h2>
      <input
        style={{ width: "50px", height: "30px", marginBottom:"10px", borderRadius:"5px", border:"1px solid grey" }}
        placeholder="Enter the Question count"
        type="number"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      {questions.map((question, index) => (
        <div key={index} style={{backgroundColor:"#e1e3ed", padding:"15px", borderRadius:"5px"}}>
          <h2 style={{fontSize:"19px", textTransform:"uppercase", color:"#f00e29"}}>Question {index + 1}</h2>
          <input
            style={{ width: "400px", height: "30px", margin:"5px 0px", borderRadius:"5px"}}
            placeholder="Enter the Question"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          <p style={{margin:"5px 0px", color:"#0e940c", fontSize:"18px", fontWeight:"bold"}}>Answers</p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <input
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                  style={{margin:"3px 0px",height:"25px", width:"180px", borderRadius:"5px",border:"1px solid gray"}}
                />
              </li>
            ))}
          </ul>
          <div>
            <label style={{color:"#3746ab", fontWeight:"bold"}}>Select Correct Answer :  </label>
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
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Time Range:", timeRange);
    console.log("Questions:", questions);
    // Send data to backend here
  };

  return (
    <div style={{marginLeft:"30px", marginTop:"10px", marginRight:"30px"}}>
      <form onSubmit={handleSubmit}>
        <InputTimerange setTimeRange={setTimeRange} />
        <EnterAssignment setQuestions={setQuestions} />
        <button style={{margin:"10px 0px", backgroundColor:"#a4a6b3", color:"#fff" , borderRadius:"5px", padding:"3px", border:"1px solid grey"}} type="submit">Submit</button>
      </form>
    </div>
  );
}
