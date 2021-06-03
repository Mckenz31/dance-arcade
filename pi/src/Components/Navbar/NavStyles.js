import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    from{

    }
    to{
        transform: translateX(0);
    }
`;
export const NavbarContainer = styled.header`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  padding: 0 !important;
  height: 150px;
  .container {
    max-width: 120rem;
    width: 90%;
    margin: 0 auto;
  }

  .menu-toggle {
    position: fixed;
    top: 2.5rem;
    right: 2.5rem;
    color: #eeeeee;
    font-size: 3rem;
    cursor: pointer;
    z-index: 1000;
    display: none;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
  }

  .brand {
    font-size: 2.5rem;
    font-weight: 600;
    transform: translateX(-100rem);
    animation: ${slideIn} 0.5s forwards;
    color: white;
  }

  nav ul {
    display: flex;
  }

  nav ul li {
    list-style: none;
    transform: translateX(100rem);
    animation: ${slideIn} 0.5s forwards;
  }

  nav ul li:nth-child(1) {
    animation-delay: 0s;
  }

  nav ul li:nth-child(2) {
    animation-delay: 0.5s;
  }

  nav ul li:nth-child(3) {
    animation-delay: 1s;
  }

  nav ul li:nth-child(4) {
    animation-delay: 1.5s;
  }

  nav ul li span {
    padding: 0.5rem 0;
    margin: 0 3rem;
    position: relative;
    letter-spacing: 2px;
    color: white;
    cursor: pointer;
  }

  nav ul li span:last-child {
    margin-right: 0;
  }

  nav ul li span::before,
  nav ul li span::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: crimson;
    left: 0;
    transform: scaleX(0);
    transition: all 0.5s;
  }

  nav ul li span::before {
    top: 0;
    transform-origin: left;
  }

  nav ul li span::after {
    bottom: 0;
    transform-origin: right;
  }

  nav ul li span:hover::before,
  nav ul li span:hover::after {
    transform: scaleX(1);
  }

  @media screen and (max-width: 700px) {
    .menu-toggle {
      display: block;
    }

    nav {
      padding-top: 0;
      display: none;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 100vh;
      text-align: center;
    }

    nav ul {
      flex-direction: column;
    }

    nav ul li {
      margin-top: 5rem;
    }

    nav ul li span {
      margin: 0;
      font-size: 2.5rem;
    }

    .brand {
      font-size: 5rem;
    }

    .overlay.menu-open,
    nav.menu-open {
      display: flex;
      transform: scale(1);
      opacity: 1;
    }
  }
`;
