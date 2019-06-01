import Board from './board.js'
import LevelsStorage from '../levels/levelsStorage.js'

export default class Game {
  constructor() {
    this.levelsStorage = new LevelsStorage()
    this.currentLevel = this.levelsStorage.levels[0]
    this.currentBoard = new Board(this.currentLevel)
  }
}
