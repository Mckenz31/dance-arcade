import React, { useEffect, useState, useRef, useCallback } from 'react';
import BGM from '../../video/bgm.mp3';
import { useHistory } from 'react-router-dom';
import BgVideo from '../../video/bgVideo2.mp4';
import MultiBgVideo from '../../video/multi.mp4';
import * as PIXI from 'pixi.js';
import { GameContainer, GameScoreCard } from './GameStyles';
import LeftArrow from '../../images/left-arrow.png';
import RightArrow from '../../images/right.png';
import { TweenMax, Linear } from 'gsap';
import GameEndsCard from '../../Components/GameEndsCard/GameEndsCard';
import Timer from '../../Components/Timer/Timer';
import { getQueryParams } from '../../utility';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomDetails, setTotalScore } from '../../actions/multiplayer';

const Game = (props) => {
  const myVar = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [finalScore, setFinalScore] = useState(0);
  const [isGameEnds, setIsGameEnds] = useState(false);
  const [startgame, setStartGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [otherCounter, setOtherCounter] = useState(0);
  const [otherFinalScore, setOtherFinalScore] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const roomDetails = useSelector((state) => state.multiplayer.room);

  useEffect(() => {
    if (startgame) {
      setIsGameEnds(false);
      getData();
    }
  }, [startgame]);
  // console.log(roomDetails, 'roomDetails');
  useEffect(() => {
    if (!isMultiplayer) {
      if (!roomDetails) {
        const params = getQueryParams(props.location.search);
        dispatch(getRoomDetails(params.room));
      }
    }
  }, [isMultiplayer, roomDetails]);

  const getData = async () => {
    // const data = await axios.get('http://localhost:8000/steps');
    //Game data
    const data = [
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 6,
        otherScore: 2
      },
      {
        one: false,
        two: true,
        three: false,
        four: false,
        score: 2,
        otherScore: 3
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 4,
        otherScore: 1
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 5,
        otherScore: 8
      },
      {
        one: false,
        two: false,
        three: false,
        four: true,
        score: 1,
        otherScore: 5
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 1,
        otherScore: 4
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 7,
        otherScore: 9
      },
      {
        one: false,
        two: false,
        three: false,
        four: true,
        score: 2,
        otherScore: 1
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 4,
        otherScore: 2
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 5,
        otherScore: 5
      },
      {
        one: false,
        two: false,
        three: false,
        four: true,
        score: 6,
        otherScore: 4
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 1,
        otherScore: 8
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 8,
        otherScore: 6
      },
      {
        one: false,
        two: true,
        three: false,
        four: false,
        score: 4,
        otherScore: 4
      },
      {
        one: false,
        two: false,
        three: true,
        four: true,
        score: 6,
        otherScore: 1
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 3,
        otherScore: 3
      },
      {
        one: false,
        two: true,
        three: false,
        four: false,
        score: 5,
        otherScore: 9
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 8,
        otherScore: 0
      },
      {
        one: false,
        two: false,
        three: false,
        four: true,
        score: 3,
        otherScore: 1
      },
      {
        one: false,
        two: true,
        three: false,
        four: false,
        score: 1,
        otherScore: 2
      },
      {
        one: false,
        two: false,
        three: true,
        four: false,
        score: 6,
        otherScore: 8
      },
      {
        one: true,
        two: false,
        three: false,
        four: false,
        score: 7,
        otherScore: 3
      },
      {
        one: false,
        two: false,
        three: false,
        four: true,
        score: 2,
        otherScore: 5
      },
      { gameEnds: true }
    ];
    PlayArrows(data);
  };

  const bgm = useRef(new Audio(BGM));

  useEffect(() => {
    bgm.current.play();
  }, [bgm]);

  const CreateArrow = useCallback(
    (image, scalex, scaley, posx, posy, rotation = 0) => {
      let left = PIXI.Sprite.from(image);
      left.anchor.set(0.5);
      left.rotation = rotation;
      props.app.stage.addChild(left);
      var scaleX = scalex;
      var scaleY = scaley;
      left.scale.set(scaleX, scaleY);
      left.x = posx;
      left.y = posy;
      left.interactive = true;
      left.buttonMode = true;
      return left;
    },
    [props.app.stage]
  );
  const OnLoad = useCallback(() => {
    props.app.zOrder = 100;
    document.querySelector('.showcase').appendChild(props.app.view);
    props.app.stage.interactive = true;
    CreateArrow(LeftArrow, 0.1, 0.1, 100, 150);
    CreateArrow(LeftArrow, 0.1, 0.1, 200, 150, 1.575);
    CreateArrow(RightArrow, 0.07, 0.06, 300, 150);
    CreateArrow(LeftArrow, 0.1, 0.1, 400, 150, -1.575);
  }, [CreateArrow, props.app]);

  const PlayLeftArrow = useCallback(
    (score, otherScore) => {
      const id = setInterval(() => {
        handleClick(score, otherScore);
        clearInterval(id);
      }, 1950);
      const left = CreateArrow(LeftArrow, 0.1, 0.1, 100, 700);
      TweenMax.to(left, 2, {
        y: 150,
        ease: Linear.easeNone
      });
    },
    [CreateArrow]
  );

  const PlayUpArrow = useCallback(
    (score, otherScore) => {
      const id = setInterval(() => {
        handleClick(score, otherScore);
        clearInterval(id);
      }, 1950);
      const up = CreateArrow(LeftArrow, 0.1, 0.1, 200, 700, 1.575);
      TweenMax.to(up, 2, {
        y: 150,
        ease: Linear.easeNone
      });
    },
    [CreateArrow]
  );

  const PlayRightArrow = useCallback(
    (score, otherScore) => {
      const id = setInterval(() => {
        handleClick(score, otherScore);
        clearInterval(id);
      }, 1950);
      const right = CreateArrow(RightArrow, 0.07, 0.06, 300, 700);
      TweenMax.to(right, 2, {
        y: 150,
        ease: Linear.easeNone
      });
    },
    [CreateArrow]
  );

  const PlayDownArrow = useCallback(
    (score, otherScore) => {
      const id = setInterval(() => {
        handleClick(score, otherScore);
        clearInterval(id);
      }, 1950);
      const down = CreateArrow(LeftArrow, 0.1, 0.1, 400, 700, -1.575);
      TweenMax.to(down, 2, {
        y: 150,
        ease: Linear.easeNone
      });
    },
    [CreateArrow]
  );

  const goToScore = () => {
    const params = getQueryParams(props.location.search);
    dispatch(setTotalScore(finalScore));
    if (isMultiplayer) {
      history.push({
        pathname: '/score',
        search: `?room=${params.room}&score=&score=${finalScore}`
      });
    } else {
      history.push({
        pathname: `/score`,
        search: `?score=${finalScore}`
      });
    }
  };

  const handleEndGame = async () => {
    setTimeout(async () => {
      setIsGameEnds(true);
      setTimeout(() => {
        goToScore();
      }, 8000);
    }, 2000);
  };

  const PlayArrows = useCallback(
    (data) => {
      var counter = 0;
      var limit = data.length - 1;
      myVar.current = setInterval(function () {
        if (counter === limit) {
          clearInterval(myVar.current);
        }
        let key = Object.keys(data[counter]).find(
          (k) => data[counter][k] === true
        );
        switch (key) {
          case 'one':
            PlayLeftArrow(data[counter].score, data[counter].otherScore);
            break;
          case 'two':
            PlayUpArrow(data[counter].score, data[counter].otherScore);
            break;
          case 'three':
            PlayRightArrow(data[counter].score, data[counter].otherScore);
            break;
          case 'four':
            PlayDownArrow(data[counter].score, data[counter].otherScore);
            break;
          case 'gameEnds':
            handleEndGame();
            break;
          default:
            break;
        }
        counter++;
      }, 500);
    },
    [PlayDownArrow, PlayUpArrow, PlayLeftArrow, PlayRightArrow]
  );

  useEffect(() => {
    const params = getQueryParams(props.location.search);
    if (Object.keys(params).length === 0) {
      setIsMultiplayer(false);
    } else {
      setIsMultiplayer(true);
    }
  }, []);

  useEffect(() => {
    OnLoad();
  }, [OnLoad]);

  useEffect(() => {
    const scores = {
      user1: {
        usName: roomDetails?.creator.usName,
        score: finalScore,
        userAvatar: roomDetails?.creator.userAvatar
      },
      user2: {
        usName: roomDetails?.joiner.usName,
        score: otherFinalScore,
        userAvatar: roomDetails?.creator.userAvatar
      },
      isMultiplayer
    };
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [otherFinalScore, roomDetails]);

  const handleClick = (value, otherValue) => {
    setOtherCounter(otherValue);
    setCounter(value);
    setFinalScore((prevScore) => prevScore + value);
    setOtherFinalScore((prevScore) => prevScore + otherValue);
    setAnimation(true);
  };

  return (
    <React.Fragment>
      <GameContainer style={{ zIndex: '-1000' }} className="showcase">
        {isGameEnds && <GameEndsCard score={finalScore} />}
        {/* {isGameEnds && <GameEndsCard score={otherFinalScore} />} uncomment this for player 2 */}
        <section>
          <video
            className="video"
            autoPlay
            loop
            muted
            style={{ zIndex: '-100' }}
          >
            <source
              src={isMultiplayer ? MultiBgVideo : BgVideo}
              type="video/mp4"
            />
          </video>
        </section>
        <div className="center">
          <Timer setStartGame={setStartGame} />
        </div>
        <div className="relative"></div>
      </GameContainer>
      {!isGameEnds && (
        <GameScoreCard style={{ zIndex: 10 }}>
          <div className="score-con">
            <h2>
              {isMultiplayer && roomDetails
                ? `${roomDetails.creator.usName}'s Score`
                : 'Current Score'}
            </h2>
            <h1
              className={`${animation ? 'animate-text' : ''}`}
              onAnimationEnd={() => setAnimation(false)}
            >
              {counter}
            </h1>
          </div>
          {isMultiplayer && roomDetails && (
            <div className="score-con">
              <h2>{roomDetails.joiner.usName}'s Score</h2>
              <h1
                className={`${animation ? 'animate-text' : ''}`}
                onAnimationEnd={() => setAnimation(false)}
              >
                {otherCounter}
              </h1>
            </div>
          )}
        </GameScoreCard>
      )}
    </React.Fragment>
  );
};

export default Game;
