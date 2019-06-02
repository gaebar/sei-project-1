import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]

    this.currentBoard = new Board(this.currentLevel)

    this.bindKeyboardEvents()
  }

  bindKeyboardEvents() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
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
