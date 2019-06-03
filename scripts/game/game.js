import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]

    this.currentBoard = new Board(this.currentLevel)

    this.bindKeyboardEvents()
    this.bindMouseEvents()
  }

  bindKeyboardEvents() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  bindMouseEvents() {
    const startButtonElement = document.getElementById('start-game-link')
    const bodyElement = document.body
    startButtonElement.addEventListener('click', () => {
      bodyElement.classList.remove('state-start')
      bodyElement.classList.add('state-game')
    })
  }

  handleKeyDown(e) {
    this.currentBoard.updateBoard(e.keyCode)
  }

  startGame() {

  }

  winGame() { }

  loseGame() { }

  resetGame() { }
}
