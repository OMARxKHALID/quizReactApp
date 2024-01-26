// StartScreen.jsx
import React from 'react';

const StartScreen = ({ startGame }) => (
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
);

export default StartScreen;
