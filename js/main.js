'use strict';

function main() {

  var playBtn        = document.querySelector('.screen button');
  var splashScreen   = document.querySelector('.screen');
  var gameScreen     = document.querySelector('.game-screen');
  var playAgainBtn   = document.querySelector('.game-over-screen button');
  var gameOverScreen = document.querySelector('.game-over-screen');
  var gameOverMsg    = document.querySelector('.game-over-screen p');
  var canvas         = document.getElementById('canvas');
  var timeDisplay    = document.querySelector('#time');
  var heroHealth     = document.querySelector('#health');
  var gameDuration   = 60;
  var timerInterval;
  
  function startGame() {
    
    // Callback function for win and fail scenari
    function callGameOver(gameOver) {
      game.stop();
      clearInterval(timerInterval);
      timeDisplay.textContent = '01:00';
      transitionBetweenScreens(gameScreen, gameOverScreen);
      if(gameOver) {
        gameOverMsg.textContent = 'You died beyond the wall...';
      } else {
        gameOverMsg.textContent = 'Congratulations! You survived.';
      }
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
  
    var game = new Game(canvas, callGameOver, decreaseHeroHealth);
    startTimer(gameDuration, timeDisplay, callGameOver);
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
        if(minutes === '00' && seconds === '00') {
          gameSuccessHandler(false);
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
    heroHealth.value = 100;
    clearInterval(this.timerInterval);
    startGame();
  });
}

window.addEventListener('load', main);

