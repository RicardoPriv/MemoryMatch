import "@/styles/status/gameWon.css"

type GameWonProps = {
  handleNextLevel: () => void;
}

function GameWon({ handleNextLevel }: GameWonProps) {
  return (
    <section id="game-won-container" className="board-surface status-screen">
      <div id="game-won-panel" className="status-panel">
        <div id="game-won-kicker" className="status-kicker">Research complete</div>
        <h1 id="game-won-title" className="status-title">You Win</h1>
        <p id="game-won-message" className="status-message">
          Every Pokemon was logged once. Clean sequence confirmed.
        </p>
      </div>
      <button id="next-level-button" onClick={handleNextLevel}>Next Level</button>
    </section>
  )
}

export default GameWon;
