const RPiGPIOButtons = require('rpi-gpio-buttons');

console.log("File is running")
let buttons = new RPiGPIOButtons({
  pins: [6, 13, 19, 26] // use GPIO 26
});

// button.on('button_event', (type, pin) => {
//     switch (type) {
//         case 'clicked':
//         console.log(`User clicked ${pin}.`);
//         break;
  
//       case 'double_clicked':
//       console.log(`User double clicked ${pin}.`);
//       break;
//     }
// });

buttons.on('pressed', pin => {
  if(pin == 26){
    console.log(`User pressed button ${pin}. - LEFT ARROW` );
  }
  else if(pin == 19){
    console.log(`User pressed button ${pin}. - TOP ARROW`);
  }
  else if(pin == 13){
    console.log(`User pressed button ${pin}. - RIGHT ARROW`);
  }
  else if(pin == 6){
    console.log(`User pressed button ${pin}. BOTTOM ARROW` );
  }
});


buttons
  .init()
  .catch(error => {
    console.log('ERROR', error.stack);
    process.exit(1);
});
