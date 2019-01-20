'use strict';

var playBtn = document.querySelector('.screen button');
var splashScreen = document.querySelector('.screen');
var gameScreen = document.querySelector('.game-screen');
var statusCard = document.querySelector('.player-status-card');
var playAgainBtn = document.querySelector('.game-over-screen button');
var gameOverScreen = document.querySelector('.game-over-screen');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


function startGame() {
  
  var gameOver = function() {
    game.stop();
  };
  
  function onKeyDown(event) {
    switch(event.keyCode) {
      case 68:
      game.onKeyPress('right', 'x');
      break;
      case 65:
      game.onKeyPress('left', 'x');
      break;
      case 87:
      game.onKeyPress('up', 'y');
      break;
      case 83:
      game.onKeyPress('down', 'y');
      break;
      default:
      console.log('No key was pressed');
    }
  }
  
  var game = new Game(canvas, gameOver);
  document.addEventListener('keydown', onKeyDown);
  game.init();
}
// window.addEventListener('load', startGame);




// function transitionBetweenScreens(toBeHidden, toBeDisplayed) {
//   toBeHidden.classList.remove('displayed');
//   toBeHidden.classList.add('hidden');
//   toBeDisplayed.classList.remove('hidden');
//   toBeDisplayed.classList.add('displayed');
// }

// playBtn.addEventListener('click', function() {
//   transitionBetweenScreens(splashScreen, gameScreen);
//   // start game
//   //End Game
  
// });

// statusCard.addEventListener('click', function() {
//   transitionBetweenScreens(gameScreen, gameOverScreen);
// });

// playAgainBtn.addEventListener('click', function() {
//   transitionBetweenScreens(gameOverScreen, gameScreen);
// });




