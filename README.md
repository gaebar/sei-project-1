# SEI Project 1 - A Stranger Things themed variation on the classic game Pac Man
See the game online at https://gaebar.github.io/eleven-s-game/

![Ga Logo](images/GA-logo.png)


### Timeframe & Team
> 7 days, solo

### The Brief
Render a grid-based game in the browser.
Design logic for winning & visually display which player won.
Include separate HTML / CSS / JavaScript files.
Use Javascript or jQuery for DOM manipulation.
Use semantic markup for HTML and CSS (adhere to best practices).
The player should be able to clear at least one board.
The player's score should be displayed at the end of the game.
Responsive design.
Each board gets more difficult.
Persistent leaderboard using localStorage.

### Additional
Add ghost follow logic where ghosts chase PacMan.

### Technologies
 - HTML5 / HTML Audio
 - CSS3
 - JavaScript - ECMAScript6
 - Animate.css
 - SCSS
 - Flexbox
 - Git
 - GitHub
 
___

## Game Summary

Eleven’s Game is a Stranger Things themed variation on the classic game Pac Man, where the user can increase their score by moving over points and avoiding the Demogorgons (ghosts).

A one-player game against a computer AI which intelligently hunts down the player. The Demogorgons have full follow logic and will track Elevn down or run away after Eleven eats a powerup.

//// A project built in just over a week, which was both the first game I had built and my first project using Vanilla JavaScript, having only been studying it for two weeks. Eleven’s Game is a Stranger Things themed variation on the classic game Pac Man, a one-player game against a computer AI which intelligently hunts down the player. 


A recreation of the classic game, where the user can increase their score by moving over points and avoiding ghosts. The ghosts have full follow logic and will track PacMan down or run away after PacMan eats a powerup./////

### Instructions & Game Controls
Control Eleven with your keyboard (arrow keys) and save the humanity from the impending invasion of the monsters from the Upside Down world.

Follow the pumpink seeds and collect as many Eggos Wafles as you can. Once you eat an Eggo, the Demogorgons can be scated away into their nest. You have three lives!

* Press Start Game to begin
* Use the  ← ↑ → ↓ keys to move Eleven around the grids
* To play again when you loose the three lives, click Restart Game

### Query String Paramenters
 - https://gaebar.github.io/sei-project-1/?screen-state=game to start the game directly
 
 ___

## Process 

A project built in just over a week, which was both the first game I had built and my first project using Vanilla JavaScript, having only been studying it for two weeks. 

### Creating Grids and Ghosts and Egos Placement

The first task in making the Eleven's Game was to create a grid. After some attempts with the provided grid, I've decided to created the level maps grid using an Array of string - See level maps in "LevelsStorage.js". 

### Challenges and Wins
Using the array of strings as reference I was able to draw the complete grid with characters on the "game-board.CSS" file sheet. Doing so the monsters and Eleven are free to move around the gameboard and not allowed to cross the walls.

 Map Tiles Types - Correspondence between map codes and DOM classes:
 
 - '■' = Walls
 - '·' = Food
 - '+' = Eggo
 - 'U' = Upside Down World
 - 'E' = Eleven
 - 'D' = Demagorgon (Ghosts)
 - 'T' = Monsters Default Target
 
To help the players enjoy their experience, I add some extra touches:
Once the player press Start Game, Eleven voice sais "Friends don't lie!", then the Stranger Things theme song begin and the player is ready to help Eleven to save the world.
Also, I added some animated gif to replace the initial instructions:

* Win Game: All the Strangers Thing characters are cheered after winning an arcade game,
* Lose Game: Eleven ask for help.
 
 ___
 
 ## Future Improvements
 #### Eleven defeat Demogorgon (Ghosts) and add more characters:

 - If I had more time, I would have like to improve the game. Ghosts follow Eleven during the game and runs away from her and start to flash when she eats an Eggo. However, it is still not possible for Eleven to defeat the Ghosts.
 
- More, make the players choose one of their favourite characters from the Stranger Things Tv Show.

## Resources
 - [Pac-Man Arceade gameplay - Youtube](https://www.youtube.com/watch?v=uswzriFIf_k)
 - [Pac-Man -Wikipedia](https://en.wikipedia.org/wiki/Pac-Man)

### Inspiration Material
These articles describe how the ghosts in the original pac-man behave:
 - [The Pac-Man Dossier](http://www.gamasutra.com/view/feature/3938/the_pacman_dossier.php?print=1)
 - [Ghost Psycology](https://www.webpacman.com/ghosts.html)
 - [Understanding Pac-man Ghost behavior](http://gameinternals.com/post/2072558330/understanding-pac-man-ghost-behavior)
