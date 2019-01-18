'use strict';

var playBtn = document.querySelector('.splash-screen button');
var splashScreen = document.querySelector('.splash-screen');
var gameScreen = document.querySelector('.game-screen');
var playAgainBtn = document.querySelector('.game-over-screen button');
var gameOverScreen = document.querySelector('.game-over-screen');


function removeSplashScreen() {
  splashScreen.classList.add('hide-splash-screen');
}

function buildGameScreen() {
  gameScreen.classList.add('display-game-screen');

  // Simulate end game after 5 seconds
  setTimeout(function() {
    removeGameScreen();
    buildGameOverScreen();
  }, 5000);
  
}

function removeGameScreen() {
  gameScreen.classList.remove('display-game-screen');
}

function buildGameOverScreen() {
  gameOverScreen.classList.add('display-game-over');
  
}

function removeGameOverScreen() {
  gameOverScreen.classList.add('game-over');
}

playBtn.addEventListener('click', function() {

  removeSplashScreen();
  buildGameScreen();

  // start game

  //End Game
  buildGameOverScreen();
});

playAgainBtn.addEventListener('click', function(){

});


