import { Player } from './src/player.js'
import { renderGameboard } from './src/ui.js'

const gameStart = document.getElementById('start-game')

function startGame() {
  const player1 = new Player()
  const player2 = new Player(true)

  player1.gameboard.setPredeterminedShips()
  player2.gameboard.setPredeterminedShips()

  renderGameboard(player1, 'player1-board', player2)

  gameStart.textContent = 'Reset'
}

gameStart.addEventListener('click', startGame)
