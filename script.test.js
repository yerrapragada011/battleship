import { Ship } from './src/ship'
import { Gameboard } from './src/gameboard'
import { Player } from './src/player'

describe('Ship class', () => {
  const ship = new Ship(5)

  test('Test ship sink', () => {
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
  const gameboard2 = new Gameboard()
  const ship = new Ship(5)
  const ship2 = new Ship(5)

  test('Attack ship', () => {
    gameboard.placeShip(ship, 2, 3, true)

    gameboard.recieveAttack(4, 5)

    expect(gameboard.allShipsSunk()).toBe(false)

    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)
    gameboard.recieveAttack(2, 3)

    expect(gameboard.allShipsSunk()).toBe(true)
  })

  test('Attack ship return', () => {
    gameboard2.placeShip(ship2, 2, 3, true)

    expect(gameboard2.recieveAttack(2, 3)).toBe('hit')
  })
})

describe('Player class', () => {
  const player1 = new Player()
  const player2 = new Player()
  const gameboard = new Gameboard()
  const ship = new Ship(5)

  test('Attack player', () => {
    player1.placeShip(ship, 2, 3, true)

    player2.attack(2, 3, player1)
    player2.attack(2, 3, player1)
    player2.attack(2, 3, player1)
    player2.attack(2, 3, player1)
    player2.attack(2, 3, player1)

    expect(gameboard.allShipsSunk()).toBe(true)
  })
})
