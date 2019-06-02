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

    this.maxColumn = this.currentLevel[0].length - 1
    this.maxRow = this.currentLevel.length - 1

    this.boardTilesElements = []

    this.populateBoardDom()
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

  // Move Eleven: removes the class from old Eleven position and assign a new one
  updateBoard(keyCode) {
    const oldElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    oldElevenElement.classList.remove('cell-eleven')

    this.eleven.position = this.getNextCharacterAcceptablePosition(this.eleven.position, keyCode)
    const currentElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    currentElevenElement.classList.add('cell-eleven')

    this.moveDemogorgons()
  }

  // Starting from the level map, create DOM elements and assign classes to display the map
  populateBoardDom() {
    const boardElement = document.getElementById('game-board')
    boardElement.innerHTML = ''

    this.currentBoard.forEach((row) => {
      const rowElement = document.createElement('div')
      rowElement.className = 'board-row'
      boardElement.appendChild(rowElement)
      const tileRowElements = []

      row.forEach((currentTile) => { //element, elementIndex, array
        const tileElement = document.createElement('span')
        tileElement.className = 'tile'

        const cellClass = Object.keys(this.tileTypes).find(key => this.tileTypes[key] === currentTile.tileTypeChar)
        tileElement.classList.add('cell-' + cellClass)

        rowElement.appendChild(tileElement)
        tileRowElements.push(tileElement)
      })

      this.boardTilesElements.push(tileRowElements)
    })
  }

  updateElevenDisplay() {
    // this.tiles.forEach(square => square.classList.remove('player'))
    // squares[playerIndex].classList.add('player')
  }

  moveDemogorgons() {

  }



  // move Eleven according to keyboard commands

  getNextCharacterAcceptablePosition(currentPosition, direction) {
    switch (direction) {
      case this.directions.up:
        if (currentPosition[0] === 0)
          return currentPosition
        else return [currentPosition[0] - 1, currentPosition[1]]
      case this.directions.down:
        if (currentPosition[0] === this.maxRow)
          return currentPosition
        else return [currentPosition[0] + 1, currentPosition[1]]
      case this.directions.left:
        if (currentPosition[1] === 0)
          return currentPosition
        else return [currentPosition[0], currentPosition[1] - 1]
      case this.directions.right:
        if (currentPosition[1] === this.maxColumn)
          return currentPosition
        else return [currentPosition[0], currentPosition[1] + 1]
    }
  }

  // correspondence between map codes and DOM classes 
  tileTypes = {
    'wall': '■',
    'food': '·',
    'eggos': '+',
    'upside': 'U',
    'eleven': 'E',
    'demogorgon': 'D',
    'target': 'T',
    'empty': ' '
  }

  // different states for the board
  boardStatesTypes = {
    'standard': 'standard',
    'eggosMode': 'eggosMode'
  }

  // map between keyboards, keycodes and directions

  directions = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  }
}
