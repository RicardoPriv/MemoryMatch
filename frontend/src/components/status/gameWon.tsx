
import "@/styles/status/gameWon.css"

function GameWon() {
  return (
    <section id="game-won-container">
      <div id="game-won-panel">
        <div id="game-won-kicker">Research complete</div>
        <h1 id="game-won-title">You Win</h1>
        <p id="game-won-message">
          Every Pokemon was logged once. Clean sequence confirmed.
        </p>
      </div>
    </section>
  )
}

export default GameWon;
