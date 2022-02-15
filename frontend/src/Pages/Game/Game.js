import React, { useEffect, useState, useRef, useCallback } from 'react';
import BGM from '../../video/bgm.mp3';
import { useHistory } from 'react-router-dom';
import BgVideo from '../../video/bgVideo2.mp4';
import * as PIXI from 'pixi.js';
import { GameContainer } from './GameStyles';
import LeftArrow from '../../images/left-arrow.png';
import RightArrow from '../../images/right.png';
import { TweenMax, Linear } from 'gsap';
import GameEndsCard from '../../Components/GameEndsCard/GameEndsCard';
import axios from 'axios';
import Timer from '../../Components/Timer/Timer';
import { useDispatch } from 'react-redux';
import { getQueryParams } from '../../utility';
import { deleteRoom } from '../../actions/multiplayer';

const Game = (props) => {
  const dispatch = useDispatch();
  const myVar = useRef();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameEnds, setIsGameEnds] = useState(false);
  const [startgame, setStartGame] = useState(false);

  useEffect(() => {
    if (startgame) {
      setIsGameEnds(false);
      getData();
    }
  }, [startgame]);

  const getData = async () => {
    const data = await axios.get('http://localhost:8000/steps');
    // const data = [
    //   //Game data
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: true, three: false, four: false },
    //   { one: false, two: false, three: true, four: false },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: false, three: false, four: true },
    //   { one: false, two: false, three: true, four: false },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: false, three: false, four: true },
    //   { one: false, two: false, three: true, four: false },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: false, three: false, four: true },
    //   { one: false, two: false, three: true, four: false },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: true, three: false, four: false },
    //   { one: false, two: false, three: true, four: true },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: true, three: false, four: false },
    //   { one: false, two: false, three: true, four: false },
    //   { one: false, two: false, three: false, four: true },
    //   { one: false, two: true, three: false, four: false },
    //   { one: false, two: false, three: true, four: false },
    //   { one: true, two: false, three: false, four: false },
    //   { one: false, two: false, three: false, four: true },
    //   { gameEnds: true }
    // ];
    console.log(data, 'game data');
    PlayArrows(data.data);
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
    const div = document.querySelector('.showcase');
    div.style.zIndex = 1000;
    props.app.zOrder = 100;
    document.querySelector('.showcase').appendChild(props.app.view);
    props.app.stage.interactive = true;
    CreateArrow(LeftArrow, 0.1, 0.1, 100, 150);
    CreateArrow(LeftArrow, 0.1, 0.1, 200, 150, 1.575);
    CreateArrow(RightArrow, 0.07, 0.06, 300, 150);
    CreateArrow(LeftArrow, 0.1, 0.1, 400, 150, -1.575);
  }, [CreateArrow, props.app]);

  const PlayLeftArrow = useCallback(() => {
    const left = CreateArrow(LeftArrow, 0.1, 0.1, 100, 700);
    TweenMax.to(left, 2, {
      y: 150,
      ease: Linear.easeNone
    });
  }, [CreateArrow]);

  const PlayUpArrow = useCallback(() => {
    const up = CreateArrow(LeftArrow, 0.1, 0.1, 200, 700, 1.575);
    TweenMax.to(up, 2, {
      y: 150,
      ease: Linear.easeNone
    });
  }, [CreateArrow]);

  const PlayRightArrow = useCallback(() => {
    const right = CreateArrow(RightArrow, 0.07, 0.06, 300, 700);
    TweenMax.to(right, 2, {
      y: 150,
      ease: Linear.easeNone
    });
  }, [CreateArrow]);

  const PlayDownArrow = useCallback(() => {
    const down = CreateArrow(LeftArrow, 0.1, 0.1, 400, 700, -1.575);
    TweenMax.to(down, 2, {
      y: 150,
      ease: Linear.easeNone
    });
  }, [CreateArrow]);

  console.log(props, 'props');

  const handleEndGame = async () => {
    const params = getQueryParams(props.location.search);
    setTimeout(async () => {
      setScore(230);
      setIsGameEnds(true);
      setTimeout(() => {
        history.push({
          pathname: '/score',
          search: `?room=${params.room}`,
          score: 230
        });
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
            PlayLeftArrow();
            break;
          case 'two':
            PlayUpArrow();
            break;
          case 'three':
            PlayRightArrow();
            break;
          case 'four':
            PlayDownArrow();
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
  // useEffect(() => {
  //   if (data.length > 0) {
  //     console.log(data,'game data')
  //     PlayArrows(data);
  //   }
  // }, [data, PlayArrows]);

  useEffect(() => {
    OnLoad();
  }, [OnLoad]);

  return (
    <React.Fragment>
      <GameContainer className="showcase">
        {isGameEnds && <GameEndsCard score={score} />}
        <section>
          <video
            className="video"
            autoPlay
            loop
            muted
            style={{ zIndex: '-100' }}
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
        </section>
        <div className="center">
          <Timer setStartGame={setStartGame} />
        </div>
        <div className="ml-auto">
          <h1>13</h1>
        </div>
      </GameContainer>
    </React.Fragment>
  );
};

export default Game;
