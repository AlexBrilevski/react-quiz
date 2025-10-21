import { useState } from 'react';
import QUESTIONS_DATA from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS_DATA.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"/>
        <h2>Quiz is complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS_DATA[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS_DATA[activeQuestionIndex].answers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
