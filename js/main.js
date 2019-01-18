'use strict';

var playBtn = document.querySelector('.screen button');
var splashScreen = document.querySelector('.screen');
var gameScreen = document.querySelector('.game-screen');
var statusCard = document.querySelector('.player-status-card');
var playAgainBtn = document.querySelector('.game-over-screen button');
var gameOverScreen = document.querySelector('.game-over-screen');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var game = new Game(canvas);

// game.init();
function onKeyDown(event) {
  switch(event.keyCode) {
    case 68:
    game.keyRight();
    console.log('D was pressed');
    break;

  }
}

document.addEventListener('keydown', onKeyDown);

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




