const express = require('express');

const app = express();

var i = 0;
var chktimer;
var obj;
var score = 0;
var maxScore = 0;

var stepPressed;

//Interfacing with the buttons
const RPiGPIOButtons = require('rpi-gpio-buttons');

console.log("File is running")

let buttons = new RPiGPIOButtons({
  pins: [6, 13, 19, 26] // use any GPIO pins, 6,13,19,26 is what I have selected
});

var stepPressed;

buttons.on('pressed', pin => {
  if(pin == 26){
    // console.log(`User pressed button ${pin}. - LEFT ARROW` );
    console.log("Pressed - one");
    stepPressed = "one";
  }
  else if(pin == 19){
    // console.log("`User pressed button ${pin}. - TOP ARROW`");
    console.log("Pressed - two");
    stepPressed = "two";
  }
  else if(pin == 13){
    // console.log(`User pressed button ${pin}. - RIGHT ARROW`);
    console.log("Pressed - three");
    stepPressed = "three";
  }
  else if(pin == 6){
    // console.log(`User pressed button ${pin}. BOTTOM ARROW` );
    console.log("Peessed - four");
    stepPressed = "four";
  }
});

//Initializing the buttons
buttons
  .init()
  .catch(error => {
    console.log('ERROR', error.stack);
    process.exit(1);
});

//Logic

var post = [ //Game data
  {one:true, two:false, three:false, four:false},
  {one:false, two:true, three:false, four:false},
  {one:false, two:false, three:true, four:false},
  {one:true, two:false, three:false, four:false},
  {one:false, two:true, three:false, four:false},
  {one:false, two:false, three:true, four:false}
];

function onClick(){
  setTimeout(() => {
    waiting();
  }, 2000) //Waits before the game starts running
};

function waiting(){
  console.log(i);
  if(i < post.length){
    chktimer = setInterval(() => {
      checking();
    }, 2000); //Each step pressed is checked at short time intervals to derive
  }
}

function checking(){
    obj = post[i];
    // console.log(obj);
    for(var key in obj){
      if(obj[key] == true){
        console.log("Solution: " +key);
        if(key == stepPressed){
          console.log(true);
          console.log("True - " +stepPressed)
          score = score + 50;
          stepPressed=null;
        }
        else{
          console.log(false);
          console.log("False - " +stepPressed);
          stepPressed=null;
        }
      }
    }
  i++;
  maxScore = maxScore+50;
  if(i == post.length){
    clearInterval(chktimer);
    console.log("GAME OVER")
    console.log("SCORE:", score, "/", maxScore)
    i=0;
  }
}

//Handles CORS issues
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
  res.setHeader("Access-Control-Allow-Header", "Origin, XMLHttpRequest X-Requested-With, Content-Type, Accept"),
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS");
  next();
})

//Api call which gets the posts and starts the game
app.get('/steps', (req, res, next) => {
  res.json(post);
  onClick();
});


app.get('/finalScore', (req, res, next) => {
  res.json({
    userScore: score,
    totalScore: maxScore
  });
})

module.exports = app;
