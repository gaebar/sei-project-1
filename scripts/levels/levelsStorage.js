

export default class LevelsStorage {
  constructor() {
    this.levels = new Array()
    this.levels.push(this.level1)
  }

  // Map Tiles Types
  //   '■' = Walls
  //   '·' = Food
  //   '+' = Eggo
  //   'U' = Upside Down World
  //   'E' = Eleven
  //   'D' = Demagorgon
  //   'T' = Monsters Default Target

  // Using the array of strings as reference I was able to draw 
  // the complete grid with characters on the "game-board.CSS" file sheet.
  // Doing so the monsters and Eleven are free to move around the gameboard 
  // and not allowed to cross the walls.

  level1 = [
    '■■■■■■■■■■■■■■■■■■■■■■■■■■■■',
    '■T···········■■···········T■',
    '■·■■■■·■■■■■·■■·■■■■■·■■■■·■',
    '■+■  ■·■   ■·■■·■   ■·■  ■+■',
    '■·■■■■·■■■■■·■■·■■■■■·■■■■·■',
    '■··························■',
    '■·■■■■·■■·■■■■■■■■·■■·■■■■·■',
    '■·■■■■·■■·■■■■■■■■·■■·■■■■·■',
    '■······■■····■■····■■······■',
    '■■■■■■·■■■■■ ■■ ■■■■■·■■■■■■',
    '     ■·■■■■■ ■■ ■■■■■·■     ',
    '     ■·■■          ■■·■     ',
    '     ■·■■ ■■■UU■■■ ■■·■     ',
    '■■■■■■·■■ ■UDUUUD■ ■■·■■■■■■',
    '      ·   ■UUUUUU■   ·      ',
    '■■■■■■·■■ ■DUUUDU■ ■■·■■■■■■',
    '     ■·■■ ■■■■■■■■ ■■·■     ',
    '     ■·■■          ■■·■     ',
    '     ■·■■ ■■■■■■■■ ■■·■     ',
    '■■■■■■·■■ ■■■■■■■■ ■■·■■■■■■',
    '■············■■············■',
    '■·■■■■·■■■■■·■■·■■■■■·■■■■·■',
    '■·■■■■·■■■■■·■■·■■■■■·■■■■·■',
    '■+··■■······· E·······■■··+■',
    '■■■·■■·■■·■■■■■■■■·■■·■■·■■■',
    '■■■·■■·■■·■■■■■■■■·■■·■■·■■■',
    '■······■■····■■····■■······■',
    '■·■■■■■■■■■■·■■·■■■■■■■■■■·■',
    '■·■■■■■■■■■■·■■·■■■■■■■■■■·■',
    '■T························T■',
    '■■■■■■■■■■■■■■■■■■■■■■■■■■■■'
  ]
}
