'use strict';

function main() {

  var playBtn        = document.querySelector('.screen button');
  var splashScreen   = document.querySelector('.screen');
  var gameScreen     = document.querySelector('.game-screen');
  var playAgainBtn   = document.querySelector('.game-over-screen button');
  var gameOverScreen = document.querySelector('.game-over-screen');
  var gameOverMsg    = document.querySelector('.game-over-screen p');
  var gameOverImage  = document.querySelector('.game-over-screen img');
  var canvas         = document.getElementById('canvas');
  var timeDisplay    = document.querySelector('#time');
  var timerShield    = document.querySelector('.timer');
  var healthElement  = document.getElementById('health');
  var heroHealth     = 100;
  var gameDuration   = 60;
  var timerInterval;
  
  
  function startGame() {

    function resetParameters() {
      clearInterval(timerInterval);
      healthElement.ldBar.set(100);
      heroHealth = 100;
      timeDisplay.textContent = '01:00';
    }
    
    // Callback function for win and fail scenari
    function callGameOver(gameOver) {
      game.stop();
      resetParameters();
      transitionBetweenScreens(gameScreen, gameOverScreen);
      if(gameOver) {
        gameOverImage.src = 'assets/stark-blood.png';
        gameOverMsg.textContent = 'You died beyond the wall...';
      } else {
        gameOverImage.src = 'assets/stark.png';        
        gameOverMsg.textContent = 'Congratulations! You survived young wolf.';
      }
    }
    
    // // For playing with A, W, S and D
    // function onKeyDown(event) {
    //   switch(event.keyCode) {
    //     case 68:
    //     game.onKeyPress('right', 'x');
    //     break;
    //     case 65:
    //     game.onKeyPress('left', 'x');
    //     break;
    //     case 87:
    //     game.onKeyPress('up', 'y');
    //     break;
    //     case 83:
    //     game.onKeyPress('down', 'y');
    //     break;
    //     default:
    //     console.log('No key was pressed');
    //   }
    // }
    // For playing with arrows
    function onKeyDown(event) {
      switch(event.keyCode) {
        case 39:
        game.onKeyPress('right', 'x');
        break;
        case 37:
        game.onKeyPress('left', 'x');
        break;
        case 38:
        game.onKeyPress('up', 'y');
        break;
        case 40:
        game.onKeyPress('down', 'y');
        break;
        default:
        console.log('No key was pressed');
      }
    }
  
    function decreaseHeroHealth() {
      console.log(heroHealth);
      heroHealth -= 25;
      console.log(heroHealth);
      healthElement.ldBar.set(heroHealth);
    }

    function shakeTimer() {
      timerShield.classList.add('timer-hit');
      // Remove class when animation ends
      timerShield.addEventListener("animationend", function(e) {
        e.preventDefault;
        timerShield.classList.remove("timer-hit");
        void timerShield.offsetWidth;
      }, false);
    }
  
    var game = new Game(canvas, callGameOver, decreaseHeroHealth, shakeTimer);
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
    clearInterval(this.timerInterval);
    startGame();
  });
}

window.addEventListener('load', main);

