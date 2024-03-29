import styled from 'styled-components';

const neonlightblue = '#03a9f4';

export const HomeContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;

  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 40px 100px;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      font-weight: 600;
    }
  }
  header .logo {
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
  }
  .toggle {
    position: relative;
    width: 60px;
    height: 60px;
    background: url(https://i.ibb.co/HrfVRcx/menu.png);
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    cursor: pointer;
  }
  .toggle.active {
    background: url(https://i.ibb.co/rt3HybH/close.png);
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: center;
    cursor: pointer;
  }
  .showcase {
    position: absolute;
    right: 0;
    width: 100%;
    min-height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111;
    transition: 0.5s;
    z-index: 2;
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
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #03a9f4;
    mix-blend-mode: overlay;
  }
  .text {
    margin: auto;
    width: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;
  }
  .centered {
    margin: auto;
  }
  .text a {
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    border: 2px solid ${neonlightblue};
    margin: 20px;
    background: transparent;
    width: 300px;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 2px;
    color: #fff;
    -webkit-box-reflect: below 0px linear-gradient (transparent, #0002);
    transition: 0.5s;
  }
  .text a:hover {
    color: #000;
    letter-spacing: 6px;
    transition-delay: 1.5s;
    box-shadow: 0 0 2px ${neonlightblue}, 0 0 4px ${neonlightblue},
      0 0 6px ${neonlightblue}, 0 0 8px ${neonlightblue};
  }
  .text a::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 2px;
    background: ${neonlightblue};
    box-shadow: 5px -8px 0 ${neonlightblue}, 5px 8px 0 ${neonlightblue};
    transition: width 0.5s, left 0.5s, height 0.5s, box-shadow 0.5s;
    transition-delay: 1s, 0.5s, 0s, 0s;
  }
  .text a:hover::before {
    width: 60%;
    height: 100%;
    left: -2px;
    box-shadow: 5px 0 0 ${neonlightblue}, 5px 0 0 ${neonlightblue};
    transition-delay: 0s, 0.5s, 1s, 1s;
  }
  .text a::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 2px;
    background: ${neonlightblue};
    box-shadow: -5px -8px 0 ${neonlightblue}, -5px 8px 0 ${neonlightblue};
    transition: width 0.5s, left 0.5s, height 0.5s, box-shadow 0.5s;
    transition-delay: 1s, 0.5s, 0s, 0s;
  }
  .text a span {
    position: relative;
    z-index: 1000;
  }
  .text a:hover::after {
    width: 60%;
    height: 100%;
    right: -2px;
    box-shadow: -5px 0 0 ${neonlightblue}, -5px 0 0 ${neonlightblue};
    transition-delay: 0s, 0.5s, 1s, 1s;
  }

  .social {
    position: absolute;
    z-index: 10;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .social li {
    list-style: none;
  }
  .social li span {
    display: inline-block;
    margin-right: 20px;
    filter: invert(1);
    transform: scale(0.5);
    transition: 0.5s;
  }
  .social li span:hover {
    transform: scale(0.5) translateY(-15px);
  }
  .menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu ul {
    position: relative;
  }
  .menu ul li {
    list-style: none;
  }
  .menu ul li a {
    text-decoration: none;
    font-size: 24px;
    color: #111;
  }
  .menu ul li a:hover {
    color: #03a9f4;
  }
  .search {
    width: 100%;
    height: 40px;
    padding: 10px;
  }
  .about {
    margin: auto;
    width: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    a {
      cursor: pointer;
      color: white;
    }
    h1 {
      color: white;
    }
    p {
      margin: 10px 0;
      text-align: justify;
      color: white;
    }
  }
  @media (max-width: 991px) {
    .showcase,
    .showcase header {
      padding: 40px;
    }
    .text h2 {
      font-size: 3em;
    }
    .text h3 {
      font-size: 2em;
    }
  }
`;
