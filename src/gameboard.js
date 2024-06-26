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
        if (this.board[i][y] !== null) {
          throw new Error('Ship overlaps')
        }
        positions.push([i, y])
      }
    } else {
      if (y + shipLength > 10) {
        throw new Error('Ship placement out of bounds')
      }

      for (let i = y; i < y + shipLength; i++) {
        if (this.board[x][i] !== null) {
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
    const cell = this.board[y][x]

    if (cell === null) {
      this.missedAttacks.push([x, y])
    } else if (cell === '-') {
      console.log('Already attacked at coordinates:', y, x)
    } else if (cell instanceof Ship) {
      if (cell._positions.some(([row, col]) => row === y && col === x)) {
        cell.hit()
      } else {
        console.log('No ship hit at coordinates:', y, x)
      }
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }

  setPredeterminedShips() {
    const shipLengths = [3, 4, 5, 2, 3]

    shipLengths.forEach((length) => {
      let horizontal = Math.random() < 0.5
      let x, y

      let overlap = true
      while (overlap) {
        if (horizontal) {
          x = Math.floor(Math.random() * (10 - length + 1))
          y = Math.floor(Math.random() * 10)
        } else {
          x = Math.floor(Math.random() * 10)
          y = Math.floor(Math.random() * (10 - length + 1))
        }

        overlap = this.checkOverlap(x, y, length, horizontal)
      }

      const ship = new Ship(length)
      this.placeShip(ship, x, y, horizontal)
    })
  }

  checkOverlap(x, y, length, horizontal) {
    if (horizontal) {
      for (let i = x; i < x + length; i++) {
        if (this.board[i][y] !== null) {
          return true
        }
      }
    } else {
      for (let i = y; i < y + length; i++) {
        if (this.board[x][i] !== null) {
          return true
        }
      }
    }
    return false
  }
}
