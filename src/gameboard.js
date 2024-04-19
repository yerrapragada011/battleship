import { Ship } from './ship.js'

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null))
    this.ships = []
    this.missedAttacks = []
  }

  placeShip(ship, x, y, horizontal) {
    let shipLength = ship.getLength()
    let positions = []

    if (horizontal) {
      if (x + shipLength > 10) {
        throw new Error('Ship placement is out of bounds')
      }

      for (let i = x; i < x + shipLength; i++) {
        if (this.board[i][y]) {
          throw new Error('Ship overlaps')
        }
        positions.push([i, y])
      }
    } else {
      if (y + shipLength > 10) {
        throw new Error('Ship placement out of bounds')
      }

      for (let i = y; i < y + shipLength; i++) {
        if (this.board[x][i]) {
          throw new Error('Ship overlaps')
        }
        positions.push([x, i])
      }
    }

    ship.setPositions(positions)
    this.ships.push(ship)

    positions.forEach(([x, y]) => {
      this.board[x][y] = ship
    })
  }

  recieveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.missedAttacks.push([x, y])
    } else {
      let ship = this.board[x][y]
      ship.hit()
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }

  setPredeterminedShips() {
    const shipCoordinates = [
      { x: 0, y: 0, length: 3, horizontal: true },
      { x: 2, y: 3, length: 4, horizontal: false }
    ]

    shipCoordinates.forEach(({ x, y, length, horizontal }) => {
      const ship = new Ship(length)
      this.placeShip(ship, x, y, horizontal)
    })
  }
}
