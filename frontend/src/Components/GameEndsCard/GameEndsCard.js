import React from 'react';
import { TweenMax, TweenLite } from 'gsap';
import './Timer.css';
const GameEndsCard = ({ score }) => {
  return (
    <section className="card-container">
      <h1 className="title-card-head">
        <span className="card-text">GAME ENDS</span>
      </h1>

      <h2 className="title-card-foot">
        <span className="card-text">YOUR SCORE IS {score}</span>
      </h2>
    </section>
  );
};

export default GameEndsCard;
