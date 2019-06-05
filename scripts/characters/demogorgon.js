// Studying and storage here the movement of the monsters

export default class Demogorgon {
  constructor(position) {
    this.position = position
  }

  target = []
  direction = ''

  move(direction) {

  }

  // update enemies targest once they are reached
  updateTarget() {

  }

  // drawing the demagorgon status

  demogorgonTypes = {
    'normal': 'normal',
    'scared': 'scared',
    'cought': 'cought'
  }

}
