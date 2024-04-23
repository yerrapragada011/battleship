export function renderGameboard(player, containerId, targetPlayer) {
  const container = document.getElementById(containerId)
  const playerTurn = document.querySelector('.player-turn')
  container.innerHTML = ''

  const currentPlayerGameboard = player.gameboard.board
  const currentPlayerShips = player.gameboard.ships
  const currentPlayerTable = createTable(
    currentPlayerGameboard,
    currentPlayerShips,
    containerId,
    true
  )
  container.appendChild(currentPlayerTable)

  const targetPlayerGameboard = targetPlayer.gameboard.board
  const targetPlayerShips = targetPlayer.gameboard.ships

  const targetPlayerTable = createTable(
    targetPlayerGameboard,
    targetPlayerShips,
    'player2-board',
    true
  )
  container.appendChild(targetPlayerTable)

  if (!player.isComputer) {
    console.log(currentPlayerShips)
    console.log(targetPlayerShips)
    playerTurn.textContent = 'Your turn!'
    currentPlayerTable.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const row = parseInt(cell.dataset.row)
        const col = parseInt(cell.dataset.col)
        player.attack(row, col, player)

        if (cell.textContent === 'O') {
          cell.textContent = 'X'
          cell.style.color = 'red'
        } else if (
          (cell.textContent === '' && targetPlayer.gameboard.allShipsSunk()) ||
          player.gameboard.allShipsSunk()
        ) {
          return
        } else if (cell.textContent === '-') {
          return
        } else if (cell.textContent === 'X') {
          return
        } else if (cell.textContent === '') {
          cell.textContent = '-'
        }

        if (
          !player.gameboard.allShipsSunk() &&
          !targetPlayer.gameboard.allShipsSunk()
        ) {
          if (targetPlayer.isComputer) {
            playerTurn.textContent = 'Computer turn!'
            setTimeout(() => {
              computerPlayerAttack(targetPlayer)
              if (!player.gameboard.allShipsSunk()) {
                playerTurn.textContent = 'Your turn!'
              }
            }, 1000)
          }
        }

        if (targetPlayer.gameboard.allShipsSunk()) {
          playerTurn.textContent = 'Computer wins!'
          return
        } else if (player.gameboard.allShipsSunk()) {
          playerTurn.textContent = 'You win!'
          return
        }
      })
    })
  }
}

function createTable(gameboard, ships, containerId, hideShips = false) {
  const table = document.createElement('table')
  table.classList.add('table')

  for (let i = 0; i < gameboard.length; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < gameboard[i].length; j++) {
      const cell = document.createElement('td')
      cell.classList.add('cell')

      let hasShip = false

      if (hideShips && ships) {
        for (const ship of ships) {
          for (const position of ship._positions) {
            if (position[0] === j && position[1] === i) {
              hasShip = true
              break
            }
          }
          if (hasShip) break
        }
      }

      if (hasShip && containerId == 'player1-board') {
        cell.textContent = 'O'
        cell.style.color = 'transparent'
      } else if (hasShip) {
        cell.textContent = 'O'
      }

      cell.dataset.row = i
      cell.dataset.col = j
      cell.dataset.container = containerId
      row.appendChild(cell)
    }

    table.appendChild(row)
  }

  return table
}

function computerPlayerAttack(computerPlayer) {
  let row, col
  let attackedPositions = new Set()

  do {
    row = Math.floor(Math.random() * 10)
    col = Math.floor(Math.random() * 10)
  } while (attackedPositions.has(`${row},${col}`))

  const cell = document.querySelector(
    `[data-row="${row}"][data-col="${col}"][data-container="player2-board"]`
  )

  computerPlayer.attack(row, col, computerPlayer)

  if (cell.textContent === 'O') {
    cell.textContent = 'X'
    cell.style.color = 'red'
  } else if (cell.textContent === '' || cell.textContent === '-') {
    cell.textContent = '-'
  }

  attackedPositions.add(`${row},${col}`)
}
