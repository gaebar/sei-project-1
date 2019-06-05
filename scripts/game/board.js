import Tile from './tile.js'
import Eleven from '../characters/eleven.js'
import Demogorgon from '../characters/demogorgon.js'

// exports this class, so eslint won't complain
// https://github.com/babel/babel-eslint/issues/8
export default class Board {
  constructor(levelMap) {
    this.currentLevel = levelMap

    this.eleven = new Eleven()
    this.initialElevenPosition

    this.demogorgons = []
    this.targets = []
    this.boardTiles = this.createBoard()

    this.scoreBoardElement = document.querySelector('#scoreboard span')

    this.currentScore = 0
    this.initialRemainLives = 3

    this.remainingLives = this.initialRemainLives
    this.spanLivesElement = document.querySelector('#lives')

    this.maxColumn = this.currentLevel[0].length - 1
    this.maxRow = this.currentLevel.length - 1

    this.boardTilesElements = []

    this.gameModeType = this.gameModeTypes.standard
    this.eggosModeTimeout = 0

    this.populateBoardDom()
  }

  createBoard() {
    let countDemogorgons = 0
    const countTargets = 0
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
            this.initialElevenPosition = this.eleven.position
            return
          case this.tileTypes.demogorgon:
            this.demogorgons[countDemogorgons] = new Demogorgon([rowIndex, columnIndex])
            countDemogorgons++
            return
          case this.tileTypes.target:
            this.targets.push([rowIndex, columnIndex])
            return
        }
      })
    })
    return board
  }

  // Move Eleven: removes the class from old Eleven position and assign a new one
  // to avoid walls I used the if statement "!this.isWall"
  updateBoard(keyCode) {
    this.updateElevenPosition(keyCode)
    this.moveDemogorgons()

    if (this.hasFood(this.eleven.position))
      this.eatFood(this.eleven.position)

    if (this.hasEggo(this.eleven.position))
      this.eatEggo(this.eleven.position)

    this.checkCollisionWithDemogorgon()
    this.checkWinCondition()
    this.checkLoseCondition()
  }

  updateElevenPosition(keyCode) {
    const nextElevenPosition = this.getNextCharacterAcceptablePosition(this.eleven.position, keyCode)
    if (this.isWall(nextElevenPosition))
      return

    const oldElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    oldElevenElement.classList.remove('cell-eleven')
    this.eleven.position = nextElevenPosition
    const currentElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    currentElevenElement.classList.add('cell-eleven')
  }

  updateDemogorgonPosition(demogorgon, nextPosition) {
    const oldDemogorgonElement = this.boardTilesElements[demogorgon.position[0]][demogorgon.position[1]]
    oldDemogorgonElement.classList.remove('cell-demogorgon')
    demogorgon.position = nextPosition
    const currentDemogorgonElement = this.boardTilesElements[demogorgon.position[0]][demogorgon.position[1]]
    currentDemogorgonElement.classList.add('cell-demogorgon')
  }

  isWall(position) {
    const selectedTile = this.boardTiles[position[0]][position[1]]
    return selectedTile.tileTypeChar === this.tileTypes.wall
  }

  hasFood(position) {
    const selectedTile = this.boardTiles[position[0]][position[1]]
    return selectedTile.tileTypeChar === this.tileTypes.food || selectedTile.tileTypeChar === this.tileTypes.target
  }

  eatFood(position) {
    this.updateScore(10)
    const tileElement = this.boardTilesElements[position[0]][position[1]]
    tileElement.classList.remove('cell-food')
    tileElement.classList.remove('cell-target')

    const selectedTile = this.boardTiles[position[0]][position[1]]
    selectedTile.tileTypeChar = this.tileTypes.empty
  }

  hasEggo(position) {
    const selectedTile = this.boardTiles[position[0]][position[1]]
    return selectedTile.tileTypeChar === this.tileTypes.eggo
  }

  eatEggo(position) {
    this.updateScore(100)
    const tileElement = this.boardTilesElements[position[0]][position[1]]
    tileElement.classList.remove('cell-eggo')

    const selectedTile = this.boardTiles[position[0]][position[1]]
    selectedTile.tileTypeChar = this.tileTypes.empty

    this.updateGameMode(this.gameModeTypes.standard, this.gameModeTypes.eggosMode)

    window.clearTimeout(this.eggosModeTimeout)
    this.eggosModeTimeout = window.setTimeout((() => {
      this.updateGameMode(this.gameModeTypes.eggosMode, this.gameModeTypes.standard)
    }).bind(this), 5000)
  }

  updateGameMode(oldGameModeType, newGameModeType) {
    this.gameModeType = newGameModeType
    document.body.classList.remove('game-' + oldGameModeType)
    document.body.classList.add('game-' + newGameModeType)
  }

  updateScore(addedScore) {
    this.currentScore += addedScore
    this.scoreBoardElement.textContent = this.currentScore
  }

  // for each demogorgon, check if demogorgon position is the same as eleven position
  checkCollisionWithDemogorgon() {
    this.demogorgons.forEach(demogorgon => {
      if (this.eleven.position[0] === demogorgon.position[0] && this.eleven.position[1] === demogorgon.position[1]) {
        this.loseLife()
      }
    })
  }

  loseLife() {
    this.remainingLives--
    this.resetElevenPosition()
    this.removeLifeDOMElement()
  }

  // Starting from the level map, create DOM elements and assign classes to display the map
  populateBoardDom() {
    const boardElement = document.getElementById('game-board')
    boardElement.innerHTML = ''

    this.boardTiles.forEach((row) => {
      const rowElement = document.createElement('div')
      rowElement.className = 'board-row'
      boardElement.appendChild(rowElement)
      const tileRowElements = []

      row.forEach((currentTile) => {
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

  moveDemogorgons() {
    this.updateTargets()
    this.demogorgons.forEach((demogorgon, index) => {
      const nextPosition = this.getClosestAllowedPosition(demogorgon.position, this.targets[index])
      this.updateDemogorgonPosition(demogorgon, nextPosition)
    })
  }

  updateTargets() {

    this.targets.forEach((target) => {
      if (Math.random() > 0.8) {
        target[0] = Math.floor(Math.random() * this.maxRow)
        target[1] = Math.floor(Math.random() * this.maxColumn)
      } else if (Math.random() < 0.3) {
        target[0] = this.eleven.position[0]
        target[1] = this.eleven.position[1]
      }
    })
  }

  getClosestAllowedPosition(demogorgonPosition, target) {
    const possibleNextPositions = []
    Object.keys(this.directions).forEach(function (key) {
      const nextPosition = this.getNextCharacterAcceptablePosition(demogorgonPosition, this.directions[key])
      const distanceFromTarget = this.calculateDistanceFromTarget(nextPosition, target)

      if (this.isWall(nextPosition))
        return

      possibleNextPositions.push([nextPosition, distanceFromTarget])
    }.bind(this))

    // sort possible demogorgons move directions by distance, using the array sort method
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    possibleNextPositions.sort((position2, position1) => {
      return position2[1] - position1[1]
    })

    return possibleNextPositions[0][0]
  }

  calculateDistanceFromTarget(position1, position2) {
    return Math.round(Math.sqrt(((position1[0] - position2[0]) ** 2) + ((position1[1] - position2[1]) ** 2)) * 10) / 10
  }

  checkLoseCondition() {
    if (this.remainingLives < 0)
      this.loseGame()
  }

  checkWinCondition() {
    // check if there are no food items left
  }

  resetElevenPosition() {
    const oldElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    oldElevenElement.classList.remove('cell-eleven')
    this.eleven.position = this.initialElevenPosition
    const currentElevenElement = this.boardTilesElements[this.eleven.position[0]][this.eleven.position[1]]
    currentElevenElement.classList.add('cell-eleven')
  }

  removeLifeDOMElement() {
    this.spanLivesElement.classList.add('remaining-lives-' + this.remainingLives)
  }

  resetLivesDOMElement() {
    this.spanLivesElement.className = ''
  }


  loseGame() {
    document.body.classList.remove('state-game')
    document.body.classList.add('state-lose')
    this.resetBoard()
  }

  resetBoard() {
    this.remainingLives = this.initialRemainLives
    this.resetLivesDOMElement()
    this.resetScoreBoard()
  }

  resetScoreBoard() {
    this.currentScore = 0
    this.scoreBoardElement.textContent = 0
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
        // pacman effect left
        if (currentPosition[1] === 0 && currentPosition[0] === this.maxRow / 2 - 1)
          return [this.maxRow / 2 - 1, this.maxColumn]
        else if (currentPosition[1] === 0)
          return currentPosition
        else return [currentPosition[0], currentPosition[1] - 1]
      case this.directions.right:
        // pacman effect right
        if (currentPosition[1] === this.maxColumn && currentPosition[0] === this.maxRow / 2 - 1)
          return [this.maxRow / 2 - 1, 0]
        if (currentPosition[1] === this.maxColumn)
          return currentPosition
        else return [currentPosition[0], currentPosition[1] + 1]
    }
  }

  // correspondence between map codes and DOM classes 
  tileTypes = {
    'wall': '■',
    'food': '·',
    'eggo': '+',
    'upside': 'U',
    'eleven': 'E',
    'demogorgon': 'D',
    'target': 'T',
    'empty': ' '
  }

  // different states for the board
  gameModeTypes = {
    standard: 'standard',
    eggosMode: 'eggos-mode'
  }

  // map between keyboards, keycodes and directions
  directions = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  }
}
