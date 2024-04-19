import { Ship, Gameboard } from './script'

describe('Ship class', () => {
  const ship = new Ship(5)

  test('test ship sink', () => {
    expect(ship._sunk).toBe(false)

    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship._sunk).toBe(true)
  })
})

describe('Gameboard class', () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(5)

  test('attack ship', () => {
    gameboard.placeShip(ship1, 2, 3, true)

    gameboard.recieveAttack(4, 5)

    expect(gameboard.allShipsSunk()).toBe(false)

    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)

    expect(gameboard.allShipsSunk()).toBe(true)
  })
})
