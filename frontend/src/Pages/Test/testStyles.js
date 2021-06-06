import styled,{keyframes} from 'styled-components'

const neonlightblue= '#03a9f4'
const animate1=keyframes`
  0%{
    left:-100%
  }
  50%,100%{
    left: 100%;
}
`;
const animate2=keyframes`
0%{
  top:-100%
}
50%,100%{
  top: 100%;
}
`;
const animate3=keyframes`
0%{
  right:-100%
}
50%,100%{
  right: 100%;
}
`;
const animate4=keyframes`
0%{
  bottom:-100%
}
50%,100%{
  bottom: 100%;
}
`;
export const HomeContainer=styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Poppins', sans-serif;
  
header
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 100px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header .logo
{
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}
.toggle
{
  position: relative;
  width: 60px;
  height: 60px;
  background: url(https://i.ibb.co/HrfVRcx/menu.png);
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: center;
  cursor: pointer;
}
.toggle.active
{
  background: url(https://i.ibb.co/rt3HybH/close.png);
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: center;
  cursor: pointer;
}
.showcase
{
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
.showcase.active
{
  right: 300px;
}

.showcase .video
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}
.overlay
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03a9f4;
  mix-blend-mode: overlay;
}
.text
{
  margin:auto;
  width:300px;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}
.centered{
  margin: auto ;
}
.text a
{
  width: 300px;
  text-align: center;
 position:relative;
 display: inline-block;
 padding:15px 30px;
 margin:20px 0;
 color: ${neonlightblue};
 font-size: 24px;
 text-decoration: none;
 text-transform: uppercase;
 transition:0.5s;
 letter-spacing:4px;
 cursor: pointer;
 overflow: hidden;
  background-color: transparent;
}
.text a:hover
{
  letter-spacing: 6px;
  color:#050801;
  background-color:${neonlightblue};
  box-shadow: 0 0 5px ${neonlightblue},
              0 0 25px ${neonlightblue},
              0 0 50px ${neonlightblue},
              0 0 200px ${neonlightblue}
  ;
}
.text a span{
  position: absolute;
  display: block;
}
a span:nth-child(1){
  top: 0;
  left: -100%;
  width:100%;
  height: 2px;
  background: linear-gradient(90deg,transparent,${neonlightblue});
  animation: ${animate1} 1s linear infinite;
}

a span:nth-child(2){
  top: -100%;
  right: 0;
  width:2px;
  height: 100%;
  background: linear-gradient(180deg,transparent,${neonlightblue});
  animation: ${animate2} 1s linear infinite;
  animation-delay:0.25s;
}

a span:nth-child(3){
  bottom: 0;
  right: -100%;
  width:100%;
  height: 2px;
  background: linear-gradient(270deg,transparent,${neonlightblue});
  animation: ${animate3} 1s linear infinite;
  animation-delay:0.5s;
}

a span:nth-child(4){
  bottom: -100%;
  left: 0;
  width:2px;
  height: 100%;
  background: linear-gradient(360deg,transparent,${neonlightblue});
  animation: ${animate4} 1s linear infinite;
  animation-delay:0.75s;
}

.social
{
  position: absolute;
  z-index: 10;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.social li
{
  list-style: none;
}
.social li a
{
  display: inline-block;
  margin-right: 20px;
  filter: invert(1);
  transform: scale(0.5);
  transition: 0.5s;
}
.social li a:hover
{
  transform: scale(0.5) translateY(-15px);
}
.menu
{
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu ul
{
  position: relative;
}
.menu ul li
{
  list-style: none;
}
.menu ul li a
{
  text-decoration: none;
  font-size: 24px;
  color: #111;
}
.menu ul li a:hover
{
  color: #03a9f4; 
}
.about{
  margin:auto;
  width:500px;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  a{
    cursor:pointer;
    color:white;
  }
  h1{
    color:white;
  }
  p{
    margin:10px 0;
    text-align:justify;
    color:white;
  }
}
  @media (max-width: 991px)
  {
    .showcase,
    .showcase header
    {
      padding: 40px;
    }
    .text h2
    {
      font-size: 3em;
    }
    .text h3
    {
      font-size: 2em;
    }
  }
`;
