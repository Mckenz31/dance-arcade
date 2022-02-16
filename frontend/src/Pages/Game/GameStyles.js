import styled, { keyframes } from 'styled-components';

export const GameContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  .showcase {
    position: absolute;
    right: 0;
    width: 100%;
    z-index: -110;
    min-height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111;
    transition: 0.5s;
    z-index: 2;
    .center {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .showcase.active {
    right: 300px;
  }

  .showcase .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const animateText = keyframes`
from{
    transform:scale(0.5);
    opacity:0.5;
}
to{
    transform:scale(1);
    opacity:1;
}
`;
export const GameScoreCard = styled.div`
  position: absolute;
  inset: 0;
  background-color: transparent;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 100px;
  .score-con {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
  }
  h2 {
    position: absolute;
    top: 0px;
    color: #fff;
  }
  .animate-text {
    position: relative;
    font-size: 107px !important;
    animation: ${animateText} 0.3s ease-in;
    text-align: center;
  }
`;
