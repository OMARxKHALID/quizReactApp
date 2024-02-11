import React, { useState, useMemo } from 'react';
import countries from './countries';
import { saveAs } from 'file-saver';
import StartScreen from './components/renderStartScreen';
import QuestionScreen from './components/renderQuestionScreen';
import EndScreen from './components/renderEndScreen';
import DetailScreen from './components/renderDetailScreen';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const App = () => {
  const [screen, setScreen] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [shuffledCountries, setShuffledCountries] = useState([]);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  const totalQuestions = 5;

  const startGame = () => {
    setShuffledCountries(shuffleArray([...countries]));
    setShuffleOptions(false);
    setScreen('question');
  };

  const handleAnswerClick = (isCorrect, selectedOption) => {
    if (selectedAnswer === null) {
      const currentCountry = shuffledCountries[currentQuestionIndex];
      const details = {
        question: currentCountry,
        correctAnswer: currentCountry.name,
        userAnswer: isCorrect ? 'Correct!' : 'Incorrect!',
        selectedAnswer: selectedOption,
      };
      setQuestionDetails((prevDetails) => [...prevDetails, details]);
      setSelectedAnswer(isCorrect);
      setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      setShuffleOptions(false);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestionDetails([]);
    setScreen('question');
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
      setShuffledCountries(shuffleArray([...countries]));
    }
  };

  const showQuestionDetails = () => {
    setScreen('detail');
  };

  const hideQuestionDetails = () => {
    setScreen('end');
  };

  const getAnswerOptions = useMemo(() => {
    const currentCountry = shuffledCountries[currentQuestionIndex];
    const correctCountryIndex = shuffledCountries.findIndex(
      (country) => country.ISOCode === currentCountry.ISOCode
    );
    let answerOptions = shuffledCountries
      .filter((_, index) => index !== correctCountryIndex)
      .slice(0, 3);

    const randomIndex = Math.floor(Math.random() * 4);
    answerOptions.splice(randomIndex, 0, currentCountry);

    return shuffleOptions ? shuffleArray(answerOptions) : answerOptions;
  }, [currentQuestionIndex, shuffledCountries, shuffleOptions]);

  const downloadDetailsAsCSV = () => {
    try {
      const csvContent =
        "Quiz Question Details\n" +
        "Question,Correct Answer,Your Answer\n" +
        questionDetails
          .map(
            (detail) =>
              `${detail.question.name},${detail.correctAnswer},${detail.userAnswer}\n`
          )
          .join('');
      const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(blob, 'question_details.csv');
    } catch (error) {
      console.error('Error generating or downloading CSV:', error);
    }
  };

  const renderContent = () => {
    switch (screen) {
      case 'start':
        return <StartScreen startGame={startGame} />;
      case 'question':
        return (
          <QuestionScreen
            score={score}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            shuffledCountries={shuffledCountries}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            nextQuestion={nextQuestion}
            getAnswerOptions={getAnswerOptions}
          />
        );
      case 'end':
        return (
          <EndScreen
            score={score}
            totalQuestions={totalQuestions}
            restartGame={restartGame}
            showQuestionDetails={showQuestionDetails}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            questionDetails={questionDetails}
            downloadDetailsAsCSV={downloadDetailsAsCSV}
            hideQuestionDetails={hideQuestionDetails}
          />
        );
      default:
        return null;
    }
  };

  return <div className="screen">{renderContent()}</div>;
};

export default App;
