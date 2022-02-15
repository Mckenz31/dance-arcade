import React from 'react';
import './score.css';
import { useHistory } from 'react-router-dom';
import { deleteRoom, unSubscribe } from '../../actions/multiplayer';
import { getQueryParams } from '../../utility';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Score = (props) => {
  const params = getQueryParams(props.location.search);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickPlayAgian = () => {
    history.push('/single-player');
  };
  const handleClickBackToHome = () => {
    history.push('/Home');
  };
  useEffect(() => {
    if (params) {
      unSubscribe && unSubscribe();
      dispatch(deleteRoom(params.room));
    }
  }, []);
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
