import React from 'react';
import './score.css';
import { useHistory } from 'react-router-dom';
import { getRoomDetails, unSubscribe } from '../../actions/multiplayer';
import { getQueryParams } from '../../utility';
import BgVideo from '../../video/bgVideo2.mp4';
import MultiBgVideo from '../../video/multi.mp4';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { dpMapping } from '../../constants/mapping';
import crown from '../../images/cro.png';
import { useDispatch } from 'react-redux';

const Score = (props) => {
  const dispatch = useDispatch();
  const finalscore = useSelector((state) => state.multiplayer.finalScore);
  const params = getQueryParams(props.location.search);
  const history = useHistory();
  const scores = JSON.parse(localStorage.getItem('scores'));
  const roomDetails = useSelector((state) => state.multiplayer.room);

  console.log(scores, 'scores');

  useEffect(() => {
    if (scores.isMultiplayer) {
      if (!roomDetails) {
        dispatch(getRoomDetails(params.room));
      }
    }
  }, []);

  const handleClickPlayAgian = () => {
    history.push('/single-player');
  };
  const handleClickBackToHome = () => {
    history.push('/Home');
  };
  useEffect(() => {
    if (params) {
      unSubscribe && unSubscribe();
    }
  }, []);

  return (
    <div className="score-container">
      <video
        className="score-video"
        autoPlay
        loop
        muted
        style={{ zIndex: '0' }}
      >
        <source src={params?.user ? MultiBgVideo : BgVideo} type="video/mp4" />
      </video>
      <div style={{ zIndex: '100' }}>
        {scores.isMultiplayer ? (
          <ul>
            {/*<ul> uncomment this for player 2
            <li>Y</li>
            <li>O</li>
            <li>U</li>
            <li> </li>
            <li></li>
            <li>L</li>
            <li>O</li>
            <li>S</li>
            <li>E</li>
            <li> </li>
            <li>T</li>
            <li>H</li>
            <li>E</li>
            <li> </li>
            <li>G</li>
            <li>A</li>
            <li>M</li>
            <li>E</li>
          </ul>*/}
            <li>Y</li>
            <li>O</li>
            <li>U</li>
            <li> </li>
            <li></li>
            <li>W</li>
            <li>O</li>
            <li>N</li>
            <li> </li>
            <li>T</li>
            <li>H</li>
            <li>E</li>
            <li> </li>
            <li>G</li>
            <li>A</li>
            <li>M</li>
            <li>E</li>
          </ul>
        ) : (
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
            <li>{scores?.user1.score}</li>
          </ul>
        )}
        {scores.isMultiplayer && (
          <div className="d-flex flex-column">
            <div className="score-page-user d-flex flex-row">
              <img src={crown} className="crown" alt="" />
              <Avatar
                shape="square"
                className="ava-radius"
                src={dpMapping[scores?.user1.userAvatar]}
                alt=""
                size={40}
              />
              <div className="d-flex flex-2 flex-row align-items-center justify-content-center">
                <h5 className="score-name">{scores?.user1.usName}</h5>
              </div>
              <div className="flex-0 d-flex flex-row align-items-center justify-content-center">
                <p className="score-final">{scores?.user1.score}</p>
              </div>
            </div>
            <div className="score-page-user d-flex flex-row">
              <Avatar
                shape="square"
                className="ava-radius"
                src={dpMapping[scores?.user2.userAvatar]}
                alt=""
                size={40}
              />
              <div className="d-flex flex-2 flex-row align-items-center justify-content-center">
                <h5 className="score-name">{scores?.user2.usName}</h5>
              </div>
              <div className="flex-0 d-flex flex-row align-items-center justify-content-center">
                <p className="score-final">{scores?.user2.score}</p>
              </div>
            </div>
          </div>
        )}
        {/* {!scores.isMultiplayer && ( */}
        <button className="ready btn-hover" onClick={handleClickPlayAgian}>
          Play Again
        </button>
        {/* )} */}
        <button className="ready btn-hover" onClick={handleClickBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Score;
