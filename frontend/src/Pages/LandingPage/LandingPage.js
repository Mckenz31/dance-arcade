import React from 'react'
import BgVideo from '../../video/bg1.mp4';
import  './LandingPageStyles.css';
import {Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>
             <section className="showcase">
    <header>
      <h2 className="logo">Dance dance revolution</h2>
      
    </header>
    <video className="video" autoPlay loop muted>
      <source src={BgVideo} type="video/mp4"/>
    </video>
    
    <div className="overlay"></div>
    <div className="text">
      <h2>Here We can add text</h2> 
      <h3>here we can add text</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.</p>
      <Link to="/Home">Enter the game</Link>
    </div>
    <ul className="social">
      <li><span><img src="https://i.ibb.co/x7P24fL/facebook.png" alt="fb"/></span></li>
      <li><span><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="tw"/></span></li>
      <li><span><img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="ig"/></span></li>
    </ul>
  </section>
        </div>
    )
}

export default LandingPage