import React,{useEffect,useState,useRef} from 'react'
import BGM from '../../video/bgm.mp3'
import BgVideo from '../../video/bgvideo.mp4';
import './HomeStyles.js'
import {HomeContainer} from './HomeStyles'


// const useAudio = url => {
//     const [audio] = useState(new Audio(url));
//     const [playing, setPlaying] = useState(false);
  
//     const toggle = () => setPlaying(!playing);
  
//     useEffect(() => {
//         playing ? audio.play() : audio.pause();
//       },
//       [playing]
//     );
  
//     useEffect(() => {
//         audio.autoplay=true;
//       audio.addEventListener('ended', () => setPlaying(true));
//       return () => {
//         audio.removeEventListener('ended', () => setPlaying(true));
//       };
//     }, []);
  
//     return [playing, toggle];
//   };

const Home = () => {
    
    const bgm=useRef(new Audio(BGM))
    const [showAboutUs,setShowAboutUs]=useState(false)
    // const [playing, toggle] = useAudio(BGM);
    useEffect(()=>{
        bgm.current.play()
        // bgm.autoplay="true";
        // bgm.play()
    },[bgm])
    
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
          <a href="/Game">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Start game</a>
        </div>
        <div>
          <a href="/Test">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Test game</a>
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
