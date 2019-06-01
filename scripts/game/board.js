import Tile from './tile.js'
import Eleven from '../characters/eleven.js'
import Demogorgon from '../characters/demogorgon.js'

// exports this class, so eslint won't complain
// https://github.com/babel/babel-eslint/issues/8
export default class Board {
  constructor(levelMap) {
    this.currentLevel = levelMap
    this.eleven = new Eleven()
    this.demogorgons = []
    this.currentBoard = this.createBoard()

    this.displayBoard()
  }

  createBoard() {
    let countDemogorgons = 0
    const board = []

    // cycle over rows in the map
    this.currentLevel.forEach((row, rowIndex) => {
      board[rowIndex] = []

      const tiles = row.split('')

      // cycle over columns in the map
      tiles.forEach((tileChar, columnIndex) => {
        const tile = new Tile(rowIndex, columnIndex, tileChar)

        board[rowIndex][columnIndex] = tile

        switch (tileChar) {
          case this.tileTypes.eleven:
            this.eleven.position = [rowIndex, columnIndex]
            return
          case this.tileTypes.demogorgon:
            this.demogorgons[countDemogorgons] = new Demogorgon([rowIndex, columnIndex])
            countDemogorgons++
            return
        }
      })
    })
    return board
  }

  displayBoard() {
    const boardElement = document.getElementById('game-board')
    boardElement.innerHTML = ''


    this.currentBoard.forEach((row) => {
      const rowElement = document.createElement('div')
      rowElement.className = 'board-row'
      boardElement.appendChild(rowElement)

      row.forEach(() => {
        const tileElement = document.createElement('div')
        tileElement.className = 'tile'
        rowElement.appendChild(tileElement)
      })
    })
  }



  tileTypes = {
    'wall': '■',
    'food': '·',
    'eggos': '+',
    'upside': 'U',
    'eleven': 'E',
    'demogorgon': 'D',
    'target': 'T'
  }
}
