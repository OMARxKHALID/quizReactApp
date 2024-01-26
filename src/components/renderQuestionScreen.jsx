import React from 'react';
import ProgressBar from '../ProgressBar';

const QuestionScreen = ({
  score,
  currentQuestionIndex,
  totalQuestions,
  shuffledCountries,
  selectedAnswer,
  handleAnswerClick,
  nextQuestion,
  getAnswerOptions,
}) => {
  const currentCountry = shuffledCountries[currentQuestionIndex];
  const answerOptions = getAnswerOptions();

  return (
    <div className="game-container">
      <div className="header">
        <h1>Flag Quiz</h1>
        <div className="scoreboard" style={{ marginLeft: "80px" }}>
          <p className="score-title">Score</p>
          <p className="score-num">{score}</p>
        </div>
        <div className="scoreboard">
          <p className="score-title">Question</p>
          <p className="score-num">{currentQuestionIndex + 1}</p>
        </div>
      </div>
      <p className="game-status-display">
        Which country is represented by this flag?
      </p>
      <ProgressBar
        round={currentQuestionIndex + 1}
        roundsTotal={totalQuestions}
      />
      <div className="question-container">
        <div className="flag">
          <img
            src={`https://flagcdn.com/80x60/${currentCountry.ISOCode}.png`}
            alt={currentCountry.name}
          />
        </div>
        <div className="answers-container">
          {answerOptions.map((country, index) => (
            <button
              key={index}
              className={`answer-button ${selectedAnswer !== null &&
                (country === currentCountry ? 'correct' : 'incorrect')
                }`}
              onClick={() =>
                handleAnswerClick(
                  country === currentCountry,
                  country.name
                )
              }
              disabled={selectedAnswer !== null}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
      <button
        className="btn"
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionScreen;
