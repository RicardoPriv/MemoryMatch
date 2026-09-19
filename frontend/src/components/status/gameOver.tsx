import "@/styles/status/gameOver.css"

type GameOverProps = {
  startOverClick: () => void
}

function GameOver({ startOverClick }: GameOverProps) {
  return (
    <section id="game-over-container" className="board-surface status-screen">
      <div id="game-over-panel" className="status-panel">
        <div id="game-over-kicker" className="status-kicker">Research interrupted</div>
        <h1 id="game-over-title" className="status-title">Game Over</h1>
        <p id="game-over-message" className="status-message">
          That Pokemon was already logged. Start a new run and keep the sequence clean.
        </p>
      </div>
      <button id="start-over-button" className="primary-action" onClick={() => startOverClick()}>New Game</button>
    </section>
  )
}

export default GameOver;
