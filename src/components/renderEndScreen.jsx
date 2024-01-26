import React from 'react';

const EndScreen = ({ score, totalQuestions, restartGame, showQuestionDetails }) => (
  <div className="game-container">
    <div className="header">
      <h1>FLAGS QUIZ</h1>
      <button className="btn start" onClick={restartGame}>
        RESTART GAME
      </button>
    </div>
    <p>Game Over</p>
    <div className="game-status-display">
      <div className="scoreboard">
        <p className="score-title">Score</p>
        <p className="score-num">{score}</p>
      </div>
      <div className="scoreboard">
        <p className="score-title">Question</p>
        <p className="score-num">{totalQuestions}</p>
      </div>
    </div>
    <p className="final-score">
      Your Final Score: {Math.round((score / totalQuestions) * 100)}%
    </p>
    {score === totalQuestions && (
      <p className="congratulations">Perfect Score! Well Done!</p>
    )}
    {score < totalQuestions && (
      <p className="encouragement">
        Keep Going! You can do better next time.
      </p>
    )}
    <div className="button-container">
      <button className="btn start" onClick={restartGame}>
        Try Again
      </button>
      <button className="btn start" onClick={showQuestionDetails}>
        Details
      </button>
    </div>
  </div>
);

export default EndScreen;
