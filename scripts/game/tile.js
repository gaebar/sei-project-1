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
'+': 'eggos',
'u': 'upside down world',
'E': 'eleven',
'D': 'demagorgon',
't': 'monsters default target'
*/
