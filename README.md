# Beyond-the-wall

## Description
Simple HTML5 game using Canvas web API. It takes example from classic arcade game like Pac-Man where a player is chased by enemies. In this particular one, we are using a timer control to make the game logic a survival one. If player survives until timer is finished, he wins. If he gets caught before, he loses.


## MVP (DOM - CANVAS)
MVP definition, deliverables.

MVP will take three wireframes: one splash screen to select a player, one game screen with the canvas element and one end screen displaying whether player has lost or won the game. A button will allow player to start again on end screen.

MVP will allow player to choose only one character. The timer will be set to one minute and game starts!

The game map will use the tilesmap technique to render a textured terrain. Character will be controlled thanks to keyboard input allowing it to move on the map when pressed.

Enemies will appear frequently on the map at random position and chase after our hero character.

If collision between our character and one enemy happens, end the game. When timer reaches zero, end the game. Display final message on end screen.


## Backlog

- Add obstacles on the map
- Update character move logic taking obstacles into account
- Update enemies move logic taking obstacles into account
- Add health point system to main character
- Update game over logic implementing health
- Update HTML and CSS with character's health 
- Add background music
- Map terrain to be randomly generated every time a game start
- Artifacts appearing on map
- Create animation on collision
- Add sounds effect on sollision
- Change behaviour based on artifacts collision
- Generate 2 layers map


## Data structure
Classes and methods definition.

  - Game
    - init()
    - start()
    - stop()
  - Map // the map object being rendered for the Game
    - render()
  - Hero // main player character
    - move()
  - Enemy 
   - move()
  

  
-------------------------------

(Optional)
  - Artifact // items rendered on map with which character can interact with


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

![alt tag](https://drive.google.com/open?id=1A3hoR_oBsZUlwUiOA69Udqwf2LQYL_Rs
 "My project wireframes")

## Task
Task definition in order of priority

-------------------------------

- Set project folders
- Push to Github repo
- Create splash screen with player selection
- Create game screen with canvas element
- Create end game screen with placeholder final message
- Add CSS to all screens
- Create DOM transition between screens

-------------------------------

- Create main.js file with canvas and game animation logic
- Create Game class, instances and principal methods
- Create Map class, instances and principal methods
- Create Hero class, instances and principal methods
- Create Enemy class, instances and principal methods
- Render map on canvas when loading
- Render character on map
- Declare startGame() method on Game class and call it on main.js
- Add moving capability to character
- Generate random enemies on map
- Add moving capability to enemies
- Limit character's moves to canvas size
- Limit enemies' moves to canvas size
- Implement collision logic
- End game on collision
- Implement play again action on end screen

-------------------------------




## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
