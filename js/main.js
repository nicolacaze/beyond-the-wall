'use strict';

var playBtn        = document.querySelector('.screen button');
var splashScreen   = document.querySelector('.screen');
var gameScreen     = document.querySelector('.game-screen');
var statusCard     = document.querySelector('.player-status-card');
var playAgainBtn   = document.querySelector('.game-over-screen button');
var gameOverScreen = document.querySelector('.game-over-screen');
var gameOverMsg    = document.querySelector('.game-over-screen p');
var canvas         = document.getElementById('canvas');
var context        = canvas.getContext('2d');
var timeDisplay    = document.querySelector('#time');
var heroHealth     = document.querySelector('#health');
var gameDuration   = 30;
var timerInterval;


function startGame() {
  
  // Callbacks functions for win and fail scenari
  function gameOver() {
    game.stop();
    clearInterval(timerInterval);
    timeDisplay.textContent = '00:30';
    transitionBetweenScreens(gameScreen, gameOverScreen);
    gameOverMsg.textContent = 'You died beyond the wall...';
  }

  function gameSuccess() {
    game.stop();
    clearInterval(timerInterval);
    timeDisplay.textContent = '00:30';
    transitionBetweenScreens(gameScreen, gameOverScreen);
    gameOverMsg.textContent = 'Congratulations! You survived.';
  }
  
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

  function decreaseHeroHealth() {
    heroHealth.value -= 25;
  }

  var game = new Game(canvas, gameOver, decreaseHeroHealth);
  // startTimer(gameDuration, timeDisplay, gameSuccess);
  game.init();

  document.addEventListener('keydown', onKeyDown);
}

var startTimer = function(duration, display, gameSuccessHandler) {
  var timer = duration, minutes, seconds;
  timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      timer--;
      if (timer < 0) {
          timer = duration;
      }
      if(seconds === '00') {
        gameSuccessHandler();
      }
  }, 1000);
}

function transitionBetweenScreens(toBeHidden, toBeDisplayed) {
  toBeHidden.classList.remove('displayed');
  toBeHidden.classList.add('hidden');
  toBeDisplayed.classList.remove('hidden');
  toBeDisplayed.classList.add('displayed');
}

playBtn.addEventListener('click', function() {
  transitionBetweenScreens(splashScreen, gameScreen);
  startGame();
});

playAgainBtn.addEventListener('click', function() {
  transitionBetweenScreens(gameOverScreen, gameScreen);
  startGame();
  
});




