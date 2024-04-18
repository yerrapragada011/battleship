import { Ship } from './script'

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

