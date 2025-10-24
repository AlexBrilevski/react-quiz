import { useState, useCallback } from 'react';
import QUESTIONS_DATA from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS_DATA.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setAnswerState('answered');
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
    setTimeout(() => {
      if (selectedAnswer === QUESTIONS_DATA[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz is complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS_DATA[activeQuestionIndex].text}
        answers={QUESTIONS_DATA[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
