import React, { useState } from 'react';
import BGM from '../../video/bgm.mp3';
import BgVideo from '../../video/bgvideo.mp4';
import './HomeStyles.js';
import { HomeContainer } from './HomeStyles';
import Sidebar from '../../Components/sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/actions';

const Home = ({ handleLogout }) => {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // function handleLogout() {
  //   dispatch(logOut());
  // }
  const toggleAbout = () => {
    setShowAboutUs(!showAboutUs);
  };
  return (
    <HomeContainer className="showcase">
      <Navbar toggleAbout={toggleAbout} handleLogout={handleLogout} />
      <Sidebar visible={visible} onClose={onClose} />
      <section className="showcase">
        <audio autoPlay controls="controls" style={{ display: 'none' }}>
          <source src={BGM} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <video className="video" autoPlay loop muted>
          <source src={BgVideo} type="video/mp4" />
        </video>

        <div className="overlay"></div>
        <div className="centered" style={{ margin: 'auto' }}>
          {!showAboutUs ? (
            <div className="text">
              <div>
                <a href="/single-player">
                  <span>Single Player</span>
                </a>
              </div>
              <div>
                <a href="/multi-player">
                  <span>Multi Player</span>
                </a>
              </div>
              <div>
                <a onClick={showDrawer}>
                  <span>Friends</span>
                </a>
              </div>
              <div>
                <a href="/chat">
                  <span>Chat Room</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="about">
              <a onClick={toggleAbout}>back</a>
              <h1>about us</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
          )}
        </div>
        <ul className="social">
          <li>
            <span>
              <img src="https://i.ibb.co/x7P24fL/facebook.png" alt="fb" />
            </span>
          </li>
          <li>
            <span>
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="tw" />
            </span>
          </li>
          <li>
            <span>
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="ig" />
            </span>
          </li>
        </ul>
      </section>
    </HomeContainer>
  );
};

export default Home;
