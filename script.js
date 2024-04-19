import { Player } from './src/player.js'
import { renderGameboard } from './src/ui.js'

function startGame() {
  const player1 = new Player()
  const player2 = new Player(true)

  player1.gameboard.setPredeterminedShips()
  player2.gameboard.setPredeterminedShips()

  renderGameboard(player1, 'player1-board', player2)
  renderGameboard(player2, 'player2-board', player1)
}

document.getElementById('start-game').addEventListener('click', startGame)
