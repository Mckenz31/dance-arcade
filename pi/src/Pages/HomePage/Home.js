import React,{useEffect,useState,useRef} from 'react'
import BGM from '../../video/bgm.mp3'
import BgVideo from '../../video/bgvideo.mp4';
import './HomeStyles.js'
import {HomeContainer} from './HomeStyles'
import {useAuth} from '../../Components/contexts/AuthContext'
import {  useHistory } from "react-router-dom"
import { message } from 'antd';
import Sidebar from '../../Components/sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {
   
    const bgm=useRef(new Audio(BGM))
    const [showAboutUs,setShowAboutUs]=useState(false);
    const [showToast,setShowToast]=useState(false);
    const { logout }=useAuth();
    const history = useHistory()

    useEffect(()=>{
      console.log(bgm,"audio")
      bgm.current.play()
      console.log(bgm,"audio after played")
    },[])

    async function handleLogout() {
      try {
        await logout()
        history.push("/auth")
      } catch {
        warning("Failed to log out")
      }
    }
    const warning = (mess) => {
      message.warning(mess,3);
  };
    
    const toggleShow = () => setShowToast(!showToast);
    
    return (
        <HomeContainer className="showcase">
          <Navbar handleLogout={handleLogout}/>
          <Sidebar/>
      <section className="showcase">
      <audio autoPlay controls="controls" style={{display:"none"}}>
        <source src={BGM} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    <video className="video" autoPlay loop muted>
      <source src={BgVideo} type="video/mp4"/>
    </video>

    <div className="overlay"></div>
    <div className="centered" style={{margin:'auto'}}>
      

      { !showAboutUs ? (
      <div className="text">
      
      <div>
          <a href="/single-player">
          {/* <span></span>
          <span></span>
          <span></span> */}
          <span>Single Player</span>
            </a>
        </div>
      <div>
          <a href="/multi-player">
          {/* <span></span>
          <span></span>
          <span></span> */}
          <span>Multi Player</span>
            </a>
        </div>
        <div>  
          <a  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          {/* <span></span>
          <span></span>
          <span></span> */}
          <span>Friends</span>
            </a>
        </div>
        <div>
          
          <a  onClick={()=>setShowAboutUs(!showAboutUs)}>
          {/* <span></span>
          <span></span>
          <span></span> */}
          <span>about us</span>
            </a>
      </div>
        </div>):(
          <div className="about">
            <a  onClick={()=>setShowAboutUs(!showAboutUs)}>back</a>
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
    <ul className="social">
      <li><a href="#"><img src="https://i.ibb.co/x7P24fL/facebook.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png"/></a></li>
    </ul>
  </section>
        </HomeContainer>
    )
}

export default Home


