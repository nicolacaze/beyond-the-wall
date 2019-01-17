var playBtn = document.querySelector('.play-btn');
var splashScreen = document.querySelector('.splash-screen');
var gameScreen = document.querySelector('.game-screen');

function removeSplashScreen() {
  splashScreen.classList.add('hide-splash-screen');
}

playBtn.addEventListener('click', function() {

  removeSplashScreen();
  buildGameScreen();

  // start game
});