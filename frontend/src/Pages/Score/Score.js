import React from 'react';
import './score.css';
import { useHistory } from 'react-router-dom';
const Score = (props) => {
  console.log(props);
  const history = useHistory();
  const handleClickPlayAgian = () => {
    history.push('/single-player');
  };
  const handleClickBackToHome = () => {
    history.push('/Home');
  };
  return (
    <div className="score-container">
      <div>
        <ul>
          <li>Y</li>
          <li>O</li>
          <li>U</li>
          <li>R</li>
          <li></li>
          <li>S</li>
          <li>C</li>
          <li>O</li>
          <li>R</li>
          <li>E</li>
          <li></li>
          <li>{props.location.score}</li>
        </ul>
        <button onClick={handleClickPlayAgian}>Play Again</button>
        <button onClick={handleClickBackToHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default Score;
