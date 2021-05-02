import React,{useEffect,useState,useRef} from 'react'
import BGM from '../../video/bgm.mp3'
import BgVideo from '../../video/bgvideo.mp4';
import './HomeStyles.js'
import {HomeContainer} from './HomeStyles'

const Home = () => {
    
    const bgm=useRef(new Audio(BGM))
    const [showAboutUs,setShowAboutUs]=useState(false)
    useEffect(()=>{
        bgm.current.play();
    },[])
    
    return (
        <HomeContainer className="showcase">
           <section class="showcase">
    <header>
      <h2 class="logo">Dance dance revolution</h2>
    </header>
    <video className="video" autoPlay loop muted>
      <source src={BgVideo} type="video/mp4"/>
    </video>
    
        
    <div class="overlay"></div>
    <div classname="centered" style={{margin:'auto'}}>

      
      { !showAboutUs ? (
      <div class="text">

      <div>
          <a href="/single-player">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Single Player</a>
        </div>
      <div>
          <a href="/multi-player">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Multi Player</a>
        </div>
        <div>  
          <a >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Settings</a>
        </div>
        <div>
          
          <a onClick={()=>setShowAboutUs(!showAboutUs)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            about us</a>
      </div>
        </div>):(
          <div className="about">
            <a onClick={()=>setShowAboutUs(!showAboutUs)}>back</a>
            <h1>about us</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
            </p>
            
          </div>
        )}
      
      
    </div>
    <ul class="social">
      <li><a href="#"><img src="https://i.ibb.co/x7P24fL/facebook.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png"/></a></li>
    </ul>
  </section>
        </HomeContainer>
    )
}

export default Home
