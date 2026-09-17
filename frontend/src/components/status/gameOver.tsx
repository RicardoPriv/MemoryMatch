import "@/styles/status/gameOver.css"

type GameOverProps = {
  startOverClick: () => void
}

function GameOver({ startOverClick }: GameOverProps) {
  return (
    <section id="game-over-container">
      <div id="game-over-panel">
        <div id="game-over-kicker">Research interrupted</div>
        <h1 id="game-over-title">Game Over</h1>
        <p id="game-over-message">
          That Pokemon was already logged. Start a new run and keep the sequence clean.
        </p>
      </div>
      <button id="start-over-button" onClick={() => startOverClick()}>New Game</button>
    </section>
  )
}

export default GameOver;
