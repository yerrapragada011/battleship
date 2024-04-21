export function renderGameboard(player, containerId, targetPlayer) {
  const container = document.getElementById(containerId)
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
    currentPlayerTable.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const row = parseInt(cell.dataset.row)
        const col = parseInt(cell.dataset.col)
        player.attack(row, col, targetPlayer)

        if (cell.textContent === 'O') {
          cell.textContent = 'X'
          cell.style.color = 'red'
        }

        if (targetPlayer.isComputer) {
          setTimeout(() => {
            computerPlayerAttack(targetPlayer, player)
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
  const row = Math.floor(Math.random() * 10)
  const col = Math.floor(Math.random() * 10)
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
    }
  }
}
