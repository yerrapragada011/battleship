export function renderGameboard(player, containerId) {
  const container = document.getElementById(containerId)
  container.innerHTML = ''

  const gameboard = player.gameboard.board

  const table = document.createElement('table')

  for (let i = 0; i < gameboard.length; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < gameboard[i].length; j++) {
      const cell = document.createElement('td')
      const content = gameboard[i][j] ? 'X' : '-'
      cell.textContent = content
      row.appendChild(cell)
    }

    table.appendChild(row)
  }

  container.appendChild(table)
}
