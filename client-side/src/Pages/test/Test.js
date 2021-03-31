import React,{useState,useEffect,useContext,useRef} from 'react'
import * as PIXI from 'pixi.js'
import LeftArrow from '../../images/left-arrow.png'
import RightArrow from '../../images/right.png'
import gsap,{TweenMax} from 'gsap'


const Test = ({app}) => {
    let [count, setCount] = useState(0);
    // let App=useRef()
    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
     
    let player=useRef()
    const [bullet,setBullet]=useState([]);
    const bulletSpeed=10;
    const [movementList,setMovementList]=useState([])
    console.log(app)
    const MovementArrowCreator=(key,posx,posy)=>{
        // let app=App.current
        let movement = new PIXI.Sprite.from(key);
        movement.anchor.set(0.5);
        movement.scale.set(0.1,0.1)
        movement.x=posx;
        movement.y=posy;
        movement.speed=10;
        app.stage.addChild(movement);
        setMovementList((prev)=>[...prev,movement])
        return movement;
    }
    const CreateArrow = (image,scalex,scaley,posx,posy,rotation=0) => {
        let left = PIXI.Sprite.from(image);
        left.anchor.set(0.5);
        left.rotation=rotation
        app.stage.addChild(left)
        const time = 2.0;
        var scaleX =scalex;
        var scaleY = scaley;    
        left.scale.set(scaleX , scaleY );
        left.x=posx
        left.y=posy
        left.interactive=true;
        left.buttonMode=true
        return left
    }
    const OnLoad =()=>{
  
        let Player =player.current
      
        document.querySelector('.GameContainer').appendChild(app.view)
        app.stage.interactive=true;
        // app.stage.on("pointerdown",trigger)
        console.log(app)
        // arrow image
        CreateArrow(LeftArrow,0.1,0.1,100,150);
        CreateArrow(LeftArrow,0.1,0.1,200,150,1.575);
        CreateArrow(RightArrow,0.07,0.06,300,150);
        CreateArrow(LeftArrow,0.1,0.1,400,150,-1.575);

     
    }

    useInterval(() => {
        // Your custom logic here
        const left=CreateArrow(LeftArrow,0.1,0.1,100,700)
        const up =CreateArrow(LeftArrow,0.1,0.1,200,700,1.575);
        const right=CreateArrow(RightArrow,0.07,0.06,300,700);
        const down = CreateArrow(LeftArrow,0.1,0.1,400,700,-1.575);
        TweenMax.fromTo(left,2,{
            y:500,yoyo:false,yoyoEase:false
        },{y:150})
        TweenMax.fromTo(right,2,{
                    y:500,yoyo:false,yoyoEase:false
                },{y:150})
        TweenMax.fromTo(up,2,{
                    y:500,yoyo:false,yoyoEase:false
                },{y:150})
        TweenMax.fromTo(down,2,{
                    y:500,yoyo:false,yoyoEase:false
                },{y:150})
      }, 2000);

    useEffect(()=>{
        OnLoad()
  
    },[])
    return (
        <div className="GameContainer">
        </div>
    )
}

export default Test





























































// const time=2;
// const [leftarrowkey,setleftarrowkey]=useState()
// const [movementList,setMovementList]=React.useState([])
// let movementSpeed=10;
// const [app]=React.useState(new PIXI.Application({
//     width:window.innerWidth,
//     height:window.innerHeight,
//     backgroundColor:0xAAAAAA
// }))
// let left;
// const CreateArrow = (image,scalex,scaley,posx,posy,handleClick,rotation=0) => {
//     left = PIXI.Sprite.from(image);
//     left.anchor.set(0.5);
//     left.rotation=rotation
//     app.stage.addChild(left)
//     const time = 2.0;
//     var scaleX =scalex;
//     var scaleY = scaley;    
//     left.scale.set(scaleX , scaleY );
//     left.x=posx
//     left.y=posy
//     left.interactive=true;
//     left.buttonMode=true
//     left.on('pointerdown',handleClick)
//     return left
//     // TweenMax.to(left.scale,time, {
//     //     x: scalex, y: scaley
//     // });
// }
// // console.log(leftarrowkey.x)
// const handleClickLeft=(e,left,right) => {
//     console.log("left arrow clicked")
   
//    let bullet= MovementArrowCreator(LeftArrow,50,400)
//    setMovementList((prev)=>[...prev,bullet])
// }
// const handleClickRight=(e) => {
//     console.log("Right arrow clicked")
// }
// const handleClickUp=(e) => {
//     console.log("Up arrow clicked")
// }
// const handleClickDown=(e) => {
//     console.log("Down arrow clicked")
// }
// const suma=(e)=>{
//     console.log(e)
// }
// const onload = () =>{
    
//     // console.log(app)
//     document.querySelector('.gameContainer').appendChild(app.view)
//     CreateArrow(LeftArrow,0.1,0.1,50,100,suma);
//     CreateArrow(LeftArrow,0.1,0.1,150,100,suma,1.575);
//     CreateArrow(RightArrow,0.07,0.06,250,100,suma);
//     CreateArrow(LeftArrow,0.1,0.1,350,100,suma,-1.575);
//    {/*below arrows are controllers*/}

//     const leftkey=CreateArrow(LeftArrow,0.1,0.1,50,400,handleClickLeft);
//     setleftarrowkey(leftkey)
//     CreateArrow(LeftArrow,0.1,0.1,150,400,handleClickUp,1.575);
//     CreateArrow(RightArrow,0.07,0.06,250,400,handleClickRight);
//     CreateArrow(LeftArrow,0.1,0.1,350,400,handleClickDown,-1.575);
//     app.ticker.add(gameLoop);

   
    
// }
// const gameLoop=(delta) => {
//     updateMovement(delta)
// }
// const MovementArrowCreator=(key,posx,posy)=>{
//     let movement = new PIXI.Sprite.from(key);
//     movement.anchor.set(0.5);
//     movement.scale.set(0.1,0.1)
//     movement.x=posx;
//     movement.y=posy;
//     movement.speed=movementSpeed;
//     app.stage.addChild(movement);
//     setMovementList((prev)=>[...prev,movement])
//     return movement;
// }
// const updateMovement=()=>{
//    for (let i=0;i<movementList.length;i++){
//     TweenMax.to(movementList[i], time, { x: 500, yoyo: false });
//    }
// }
