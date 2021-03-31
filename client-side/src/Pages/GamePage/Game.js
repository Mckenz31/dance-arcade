import React,{useState} from 'react'
import * as PIXI from 'pixi.js'
import LeftArrow from '../../images/left-arrow.png'
import RightArrow from '../../images/right.png'
import gsap,{TweenMax} from 'gsap';


const Game = () => {
    let left;
    let right;
    let up;
    let down;
    let leftarrow;
    let rightarrow;
    let uparrow;
    let downarrow;
    let [app]=React.useState(new PIXI.Application({
        width:window.innerWidth,
        height:window.innerHeight,
        backgroundColor:0xAAAAAA
    }))
    const CreateArrow = (image,scalex,scaley,posx,posy,rotation=0) => {
        let left;
        left = PIXI.Sprite.from(image);
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
        // left.on('pointerdown',handleClick)
        return left
    }
   
   
    const onload = () =>{
    
        // console.log(app)
        document.querySelector('.gameContainer').appendChild(app.view)
        leftarrow=CreateArrow(LeftArrow,0.1,0.1,50,100);
        uparrow=CreateArrow(LeftArrow,0.1,0.1,150,100,1.575);
        rightarrow=CreateArrow(RightArrow,0.07,0.06,250,100);
        downarrow=CreateArrow(LeftArrow,0.1,0.1,350,100,-1.575);
       {/*below arrows are controllers*/}
       app.stage.interactive=true;
        app.stage.on("pointerdown",triggerleft)
        // rightarrow.on("pointerdown",triggerright)
        // uparrow.on("pointerdown",triggerup)
        // downarrow.on("pointerdown",triggerdown)
        // app.ticker.add(gameLoop)
    }
    
    const triggerleft=(e)=>{
        console.log("clicked")
        left=CreateArrow(LeftArrow,0.1,0.1,50,400);
        TweenMax.fromTo(left,1,{
            y:500,yoyo:false,yoyoEase:false
        },{y:100})
        right=CreateArrow(RightArrow,0.07,0.06,250,400);
        TweenMax.fromTo(right,2,{
            y:500,yoyo:false,yoyoEase:false
        },{y:100})
        up=CreateArrow(LeftArrow,0.1,0.1,150,400,1.575);
        TweenMax.fromTo(up,2,{
            y:500,yoyo:false,yoyoEase:false
        },{y:100})
        down=CreateArrow(LeftArrow,0.1,0.1,350,400,-1.575);
        TweenMax.fromTo(down,2,{
            y:500,yoyo:false,yoyoEase:false
        },{y:100})
    }
    const triggerright=(e)=>{
        console.log("clicked")
        right=CreateArrow(RightArrow,0.07,0.06,250,400);
        TweenMax.fromTo(right,3,{
            y:500,yoyo:false,yoyoEase:false
        },{y:100})
    }
    const triggerup=(e)=>{
        console.log("clicked")
        up=CreateArrow(LeftArrow,0.1,0.1,150,400,1.575);
        TweenMax.to(left,3,{
            y:-200,yoyo:false
        })
    }
    const triggerdown=(e)=>{
        console.log("clicked")
        down=CreateArrow(LeftArrow,0.1,0.1,350,400,-1.575);
        TweenMax.to(left,3,{
            y:-200,yoyo:false
        })
    }
    const CheckArrowIntersect=(a,b)=>{
        let aArrow=a.getBounds();
        let bArrow=b.getBounds();

        return aArrow.x + aArrow.width > bArrow.x &&
                aArrow.x < bArrow.x +bArrow.width &&
                aArrow.y + aArrow.height > bArrow.y &&
                aArrow.y < bArrow.y + bArrow.height
    }
    
    const gameLoop =(delta)=>{
        // if(CheckArrowIntersect(left,leftarrow)){
        //     speed
        // }
    }
    React.useEffect(() => {

        onload()
    },[])
    return (
        <div className="gameContainer">
            <h1>game</h1>
        </div>
    )
}

export default Game
