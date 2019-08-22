export default class Tile {
  constructor(row, col, tileTypeChar) {
    this.row = row
    this.col = col
    this.tileTypeChar = tileTypeChar
  }
}

/*
'■': 'wall',
'·': 'food',
'+': 'eggo',
'u': 'upside down world',
'E': 'eleven',
'D': 'demogorgon',
't': 'monsters default target'
*/
