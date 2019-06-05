import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

// const audio = document.getElementById('audio')   // CHECK!

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]

    this.currentBoard = new Board(this.currentLevel)

    this.updateBoardIntervalID = 0

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
      // audio.src = './audio/start-button.mp3'
      // audio.play()
      this.startGame()

    })
  }

  handleKeyDown(e) {
    window.clearInterval(this.updateBoardIntervalID)
    this.updateBoardIntervalID = window.setInterval((() => {
      this.currentBoard.updateBoard(e.keyCode)
    }).bind(this), 100)
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