import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS_DATA from '../questions.js';

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter(answer => answer === null).length;
  const correctAnswrs = userAnswers.filter((answer, index) => answer === QUESTIONS_DATA[index].answers[0]).length;
  const skippedAnswersShare = Math.round((skippedAnswers / userAnswers.length) * 100);
  const correctAnswrsShare = Math.round((correctAnswrs / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswrsShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz is complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped questions</span>
        </p>
        <p>
          <span className="number">{correctAnswrsShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS_DATA[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS_DATA[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}