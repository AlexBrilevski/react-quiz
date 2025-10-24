import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelectAnswer }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = answer === selectedAnswer;
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button className={cssClass} onClick={() => onSelectAnswer(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
