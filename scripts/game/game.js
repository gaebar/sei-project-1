import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]

    this.currentBoard = new Board(this.currentLevel)
    this.initialAudio = document.querySelector('#audio')
    this.themeMusic = document.querySelector('#theme-music')

    this.bindKeyboardEvents()
    this.bindMouseEvents()

    this.readQueryStringCommands()
  }

  bindKeyboardEvents() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  // const audio = new Audio()

  bindMouseEvents() {
    const startButtonElement = document.getElementById('start-game-link')
    startButtonElement.addEventListener('click', () => {
      this.initialAudio.play()
      this.startGame()
      window.setTimeout((() => {
        this.themeMusic.play()
      }).bind(this), 1000)
    })
  }

  handleKeyDown(e) {
    this.currentBoard.sendGameInput(e)
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

  // TRY
  winGame() {
    // const bodyElement = document.body
    // bodyElement.classList.remove('state-start')
    // bodyElement.classList.add('state-game')
  }

  loseGame() {
    const bodyElement = document.body
    bodyElement.classList.remove('start-start')
    bodyElement.classList.add('start-game')
  }

  resetGame() {
    const bodyElement = document.body
    bodyElement.classList.remove('start-start')
    bodyElement.classList.add('state-game')
  }
}