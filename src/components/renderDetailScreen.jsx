import React from 'react';

const DetailScreen = ({
  questionDetails,
  downloadDetailsAsCSV,
  hideQuestionDetails,
}) => (
  <div className="details-screen">
    <h2>Details</h2>
    <div className="details-table-container">
      <table className="details-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Selected answer</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questionDetails.map((detail, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`https://flagcdn.com/40x30/${detail.question.ISOCode}.png`}
                  alt={detail.question.name}
                />
              </td>
              <td>{detail.selectedAnswer}</td>
              <td
                className={
                  detail.userAnswer === 'Correct!'
                    ? 'correct-answer'
                    : 'incorrect-answer'
                }
              >
                {detail.userAnswer}
              </td>
              <td>{detail.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="button-container">
      <button className="btn" onClick={downloadDetailsAsCSV}>
        Download
      </button>
      <button className="btn" onClick={hideQuestionDetails}>
        Close Details
      </button>
    </div>
  </div>
);

export default DetailScreen;
