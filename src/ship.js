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
