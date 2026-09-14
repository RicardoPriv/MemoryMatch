import "@/styles/analytics/Data.css"


function Data() {
  return (
    <section id="data-section">
      <div id="score">
        <div className="container">
          <div className="data-desc">Current Score</div>
          <div id="score-count">0/16</div>
        </div>
        <div id="score-bar"></div>
      </div>
      <div id="highscore">
        <div className="data-desc">Best Score</div>
        <div id="highscore-count">0</div>
      </div>
      <div id="remaining">
        <div className="data-desc">Remaining</div>
        <div id="remaining-count">0</div>
      </div>
      <div id="log">
        <p>Waiting...</p>
      </div>
    </section>
  )
}

export default Data;
