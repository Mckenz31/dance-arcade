const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin","*"),
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS");
//   next();
// })

// app.use((req, res, next) => {
//   res.send("Testing - it should appear on your browser");
//   next();
// })

// app.get('/steps', (req, res, next) => {
//   let post = [
//     {one:true, two:false, three:false, four:false},
//     {one:false, two:true, three:false, four:false},
//     {one:false, two:false, three:true, four:false}
//   ];
//   res.json(post);
// })

// module.exports = app;


var i = 0;
var chktimer;
var obj;
var score = 0;
var maxScore = 0;

var steps = ["one", "three", "three", "two", "two", "three"]
var post = [
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
  }, 2000)
};

function waiting(){
  console.log(i);
  if(i < post.length){
    chktimer = setInterval(() => {
      checking();
    }, 1000);
  }
}

function checking(){
    obj = post[i];
    console.log(obj);
    for(var key in obj){
      if(obj[key] == true){
        console.log(key);
        if(key == steps[i]){
          console.log(true);
          score = score + 50;
        }
        else{
          console.log(false);
        }
      }
    }
  i++;
  maxScore = maxScore+50;
  if(i == post.length){
    clearInterval(chktimer);
    console.log("GAME OVER")
    console.log("SCORE:", score, "/", maxScore)
  }
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
  res.setHeader("Access-Control-Allow-Header", "Origin, XMLHttpRequest X-Requested-With, Content-Type, Accept"),
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS");
  next();
})

app.get('/steps', (req, res, next) => {
  res.json(post);
  onClick();
})

module.exports = app;
