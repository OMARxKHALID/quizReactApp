import React, { useState } from 'react';
import countries from './countries';
import ProgressBar from './ProgressBar.jsx';
import { saveAs } from 'file-saver';

function App() {
  const [screen, setScreen] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const totalQuestions = 5;
  const [questionDetails, setQuestionDetails] = useState([]);

  const startGame = () => {
    setScreen('question');
  };

  const handleAnswerClick = (isCorrect) => {
    const details = {
      question: currentCountry.name,
      correctAnswer: currentCountry.name,
      userAnswer: isCorrect ? 'Correct!' : 'Incorrect!',
    };
    setQuestionDetails((prevDetails) => [...prevDetails, details]);

    setSelectedAnswer(isCorrect);
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
    setScreen('result');
  };


  const nextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < totalQuestions - 1 ? prevIndex + 1 : 0
    );
    if (currentQuestionIndex === totalQuestions - 1) {
      setScreen('end');
    } else {
      setScreen('question');
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setScreen('question');
  };

  const showQuestionDetails = () => {
    setShowDetails(true);
    setScreen('detail');
  };

  const hideQuestionDetails = () => {
    setShowDetails(false);
    setScreen('question');
  };

  const currentCountry = countries[currentQuestionIndex];
  const answerOptions = getAnswerOptions();

  function getAnswerOptions() {
    const shuffledCountries = [...countries].sort(() => Math.random() - 0.5);
    const correctCountryIndex = shuffledCountries.findIndex(
      (country) => country.ISOCode === currentCountry.ISOCode
    );
    const answerOptions = shuffledCountries
      .filter((_, index) => index !== correctCountryIndex)
      .slice(0, 3);
    const randomIndex = Math.floor(Math.random() * 4);
    answerOptions.splice(randomIndex, 0, shuffledCountries[correctCountryIndex]);
    return answerOptions;
  }

  const downloadDetailsAsCSV = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," +
        "Quiz Question Details\n" +
        "Question,Correct Answer,Your Answer\n" +
        questionDetails.map(detail =>
          `${detail.question},${detail.correctAnswer},${detail.userAnswer}\n`
        ).join('');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'question_details.csv');
    } catch (error) {
      console.error('Error generating or downloading CSV:', error);

    }
  };


  return (
    <div className="screen">
      {screen === 'start' && (
        <div className="screen">

          <div className="game-container">
            <div className="header">
              <h1>Flag Quiz</h1>
              <button className="btn start" onClick={startGame}>
                START GAME
              </button>
            </div>
            <p>Test your knowledge of world flags!</p>

          </div>
        </div>

      )}

      {screen === 'question' && (
        <div className="game-container">
          <div className="header">
            <h1>Flag Quiz</h1>
            <div className="scoreboard" style={{ marginLeft: "80px" }}>
              <p className="score-title">
                Score
              </p>
              <p className="score-num">{score}</p>
            </div>
            <div className="scoreboard">
              <p className="score-title">Question</p>
              <p className="score-num">{currentQuestionIndex + 1}</p>
            </div>
          </div>
          <p className="game-status-display">Which country is represented by this flag?</p>
          <ProgressBar round={currentQuestionIndex + 1} roundsTotal={totalQuestions} />

          <div className="question-container">
            <div className="flag">
              <img
                src={`https://flagcdn.com/80x60/${currentCountry.ISOCode}.png`}
                alt={currentCountry.name}
                style={{
                  width: '75px',
                  height: '58px',
                }}
              />

            </div>
            <div className="answers-container">
              {answerOptions.map((country, index) => (
                <button
                  key={index}
                  className={`answer-button ${selectedAnswer !== null ? (country === currentCountry ? 'correct' : 'incorrect') : ''
                    }`}
                  onClick={() => handleAnswerClick(country === currentCountry)}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === 'result' && (
        <div className="game-container">
          <div>
            <p className="result-message">{selectedAnswer ? 'Correct!' : 'Incorrect!'}</p>
            <p className="score">Score: {score}</p>
            <button className="btn" onClick={nextQuestion}>
              Next Question
            </button>
          </div>
        </div>
      )}

      {screen === 'end' && (
        <div className="game-container">
          <div className="header">
            <h1>FLAGS QUIZ</h1>
            <button className="btn start" onClick={restartGame}>
              START GAME
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
          <p className="final-score">Your Final Score: {Math.round((score / totalQuestions) * 100)}%</p>
          {score === totalQuestions && (
            <p className="congratulations">Perfect Score! Well Done!</p>
          )}
          {score < totalQuestions && (
            <p className="encouragement">Keep Going! You can do better next time.</p>
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
      )}


      {screen === 'detail' && (
        <div className="details-screen">
          <h2>All Question Details</h2>
          <table className="details-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {questionDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.question}</td>
                  <td>{detail.correctAnswer}</td>
                  <td className={detail.userAnswer === 'Correct!' ? 'correct-answer' : 'incorrect-answer'}>
                    {detail.userAnswer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="btn" onClick={downloadDetailsAsCSV}>
              Download CSV
            </button>
            <button className="btn" onClick={hideQuestionDetails}>
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
