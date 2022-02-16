const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

var i = 0;
var chktimer;
var obj;
var score = 0;
var maxScore = 0;

var stepPressed;

//Interfacing with the buttons
const RPiGPIOButtons = require('rpi-gpio-buttons');

console.log('File is running');

let buttons = new RPiGPIOButtons({
  pins: [6, 13, 19, 26] // use any GPIO pins, 6,13,19,26 is what I have selected
});

buttons.on('pressed', (pin) => {
  if (pin === 26) {
    console.log('Pressed - one');
    stepPressed = 'one';
  } else if (pin === 19) {
    console.log('Pressed - two');
    stepPressed = 'two';
  } else if (pin === 13) {
    console.log('Pressed - three');
    stepPressed = 'three';
  } else if (pin === 6) {
    console.log('Peessed - four');
    stepPressed = 'four';
  }
});

//Initializing the buttons
// buttons.init().catch((error) => {
//   console.log('ERROR', error.stack);
//   process.exit(1);
// });

//Logic

var post = [
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 6,
    otherScore: 2
  },
  {
    one: false,
    two: true,
    three: false,
    four: false,
    score: 2,
    otherScore: 3
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 4,
    otherScore: 1
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 5,
    otherScore: 8
  },
  {
    one: false,
    two: false,
    three: false,
    four: true,
    score: 1,
    otherScore: 5
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 1,
    otherScore: 4
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 7,
    otherScore: 9
  },
  {
    one: false,
    two: false,
    three: false,
    four: true,
    score: 2,
    otherScore: 1
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 4,
    otherScore: 2
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 5,
    otherScore: 5
  },
  {
    one: false,
    two: false,
    three: false,
    four: true,
    score: 6,
    otherScore: 4
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 1,
    otherScore: 8
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 8,
    otherScore: 6
  },
  {
    one: false,
    two: true,
    three: false,
    four: false,
    score: 4,
    otherScore: 4
  },
  {
    one: false,
    two: false,
    three: true,
    four: true,
    score: 6,
    otherScore: 1
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 3,
    otherScore: 3
  },
  {
    one: false,
    two: true,
    three: false,
    four: false,
    score: 5,
    otherScore: 9
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 8,
    otherScore: 0
  },
  {
    one: false,
    two: false,
    three: false,
    four: true,
    score: 3,
    otherScore: 1
  },
  {
    one: false,
    two: true,
    three: false,
    four: false,
    score: 1,
    otherScore: 2
  },
  {
    one: false,
    two: false,
    three: true,
    four: false,
    score: 6,
    otherScore: 8
  },
  {
    one: true,
    two: false,
    three: false,
    four: false,
    score: 7,
    otherScore: 3
  },
  {
    one: false,
    two: false,
    three: false,
    four: true,
    score: 2,
    otherScore: 5
  },
  { gameEnds: true }
];

function onClick() {
  setTimeout(() => {
    waiting();
  }, 2750); //Waits before the game starts running
}

function waiting() {
  console.log(i);
  if (i < post.length) {
    chktimer = setInterval(() => {
      checking();
    }, 500); //Each step pressed is checked at short time intervals to derive
  }
}

function checking() {
  obj = post[i];
  for (var key in obj) {
    if (obj[key] === true) {
      console.log('Solution: ' + key);
      if (key === stepPressed) {
        console.log(true);
        console.log('True - ' + stepPressed);
        score = score + 50;
        stepPressed = null;
      } else {
        console.log(false);
        console.log('False - ' + stepPressed);
        stepPressed = null;
      }
    }
  }
  i++;
  maxScore = maxScore + 50;
  if (i === post.length) {
    clearInterval(chktimer);
    console.log('GAME OVER');
    console.log('SCORE:', score, '/', maxScore);
    i = 0;
  }
}

// Automatically allow cross-origin requests
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));

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
});

module.exports = app;
