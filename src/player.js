import { Gameboard } from './gameboard.js'

export class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer
    this.gameboard = new Gameboard()
  }

  placeShip(ship, x, y, horizontal) {
    this.gameboard.placeShip(ship, x, y, horizontal)
  }

  attack(x, y, targetPlayer) {
    if (!this.isComputer && targetPlayer) {
      targetPlayer.gameboard.recieveAttack(x, y)
    } else {
      throw new Error('Computer player cannot attack without a target player')
    }
  }
}
