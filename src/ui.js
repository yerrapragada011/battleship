export function renderGameboard(player, containerId, targetPlayer) {
  const container = document.getElementById(containerId)
  const playerTurn = document.querySelector('.player-turn')
  container.innerHTML = ''

  const currentPlayerGameboard = player.gameboard.board
  const currentPlayerTable = createTable(
    currentPlayerGameboard,
    containerId,
    true
  )
  container.appendChild(currentPlayerTable)

  const targetPlayerGameboard = targetPlayer.gameboard.board
  const targetPlayerTable = createTable(targetPlayerGameboard, 'player2-board')
  container.appendChild(targetPlayerTable)

  if (!player.isComputer) {
    playerTurn.textContent = 'Your turn!'
    currentPlayerTable.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const row = parseInt(cell.dataset.row)
        const col = parseInt(cell.dataset.col)
        player.attack(row, col, targetPlayer)

        if (cell.textContent === 'O') {
          cell.textContent = 'X'
          cell.style.color = 'red'
        } else if (cell.textContent === '') {
          cell.textContent = '-'
        } else if (cell.textContent === '-') {
          return
        }

        if (targetPlayer.isComputer) {
          playerTurn.textContent = 'Computer turn!'
          setTimeout(() => {
            computerPlayerAttack(targetPlayer, player)
            playerTurn.textContent = 'Your turn!'
          }, 1000)
        }
      })
    })
  }
}

function createTable(gameboard, containerId, hideShips = false) {
  const table = document.createElement('table')
  table.classList.add('table')

  for (let i = 0; i < gameboard.length; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < gameboard[i].length; j++) {
      const cell = document.createElement('td')
      cell.classList.add('cell')
      if (hideShips && gameboard[i][j]) {
        cell.textContent = 'O'
        cell.style.color = 'transparent'
      } else {
        cell.textContent = gameboard[i][j] ? 'O' : ''
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

function computerPlayerAttack(computerPlayer, humanPlayer) {
  let row, col
  let attackedPositions = new Set()

  do {
    row = Math.floor(Math.random() * 10)
    col = Math.floor(Math.random() * 10)
  } while (attackedPositions.has(`${row},${col}`))

  console.log('Row:', row, 'Col:', col)

  const cell = document.querySelector(
    `[data-row="${row}"][data-col="${col}"][data-container="player2-board"]`
  )

  computerPlayer.attack(row, col, humanPlayer)

  if (cell.textContent === 'O') {
    console.log('hit')
    cell.textContent = 'X'
    cell.style.color = 'red'
  } else {
    if (cell.textContent === '') {
      console.log('miss')
      cell.textContent = '-'
    }
  }

  attackedPositions.add(`${row},${col}`)
}
