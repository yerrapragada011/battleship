export class Ship {
  constructor(length) {
    this._length = length
    this._hits = 0
    this._sunk = false
    this._positions = []
  }

  hit() {
    this._hits++
    if (this._length <= this._hits) {
      this._sunk = true
    }
  }

  isSunk() {
    return this._sunk
  }

  getLength() {
    return this._length
  }

  setPositions(positions) {
    this._positions = positions
  }
}

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
        throw new Erro('Ship placement is out of bounds')
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
}

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
