import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]

    this.currentBoard = new Board(this.currentLevel)

    this.bindKeyboardEvents()
    this.bindMouseEvents()

    this.readQueryStringCommands()
  }

  bindKeyboardEvents() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  bindMouseEvents() {
    const startButtonElement = document.getElementById('start-game-link')
    startButtonElement.addEventListener('click', () => {
      this.startGame()
    })
  }

  handleKeyDown(e) {
    this.currentBoard.updateBoard(e.keyCode)
  }

  startGame() {
    const bodyElement = document.body
    bodyElement.classList.remove('state-start')
    bodyElement.classList.add('state-game')
  }

  readQueryStringCommands() {
    const urlParams = new URLSearchParams(window.location.search)
    const screenState = urlParams.get('screen-state')
    if (screenState === 'game')
      this.startGame()
  }

  winGame() { }

  loseGame() { }

  resetGame() { }
}

// INCREASE SCORE

// newGame() {
//   this.level = 1;
//   this.score = 0;
//   this.isLost = false;
//   this.lives = 3;
//   this.newLevel();
// }

// newLevel() {
//   this.eleven = new Eleven(this);
//   this.demogorgons = [];
//   this.scatter = false;
//   this.modeCount = 0;

//   for (let i = 0; i < 4; i++) {
//     this.demogorgons.push(new Demogorgon(this, i));
//   }


// // START GAME BUTTON - When start "Friend's don't lie" sound, then stranger things theme
// const $startButton = $('#start-game')
// $startButton.on('click', () => {
//   audio.src = '../audio/intro.wav'
//   audio.play()
//   startGame()
// })