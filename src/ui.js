export function renderGameboard(player, containerId, targetPlayer) {
  const container = document.getElementById(containerId)
  container.innerHTML = ''

  const gameboard = player.gameboard.board

  const table = document.createElement('table')
  table.classList.add('table')

  for (let i = 0; i < gameboard.length; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < gameboard[i].length; j++) {
      const cell = document.createElement('td')
      cell.classList.add('cell')
      const content = gameboard[i][j] ? 'O' : '-'
      cell.textContent = content
      cell.dataset.row = i
      cell.dataset.col = j

      if (!player.isComputer) {
        cell.addEventListener('click', () => {
          const row = parseInt(cell.dataset.row)
          const col = parseInt(cell.dataset.col)
          player.attack(row, col, targetPlayer)

          if (cell.textContent === 'O') {
            cell.textContent = 'X'
            cell.style.color = 'red'
          }
        })
      }

      row.appendChild(cell)
    }

    table.appendChild(row)
  }

  container.appendChild(table)
}
