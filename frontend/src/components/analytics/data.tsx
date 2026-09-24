import "@/styles/analytics/Data.css"
import type { CSSProperties } from "react"

type DataProps = {
  level: number,
  totalScore: number,
  currentScore: number,
  bestScore: number
}

function Data({ level, totalScore, currentScore, bestScore }: DataProps) {
  const scoreProgress = totalScore > 0 ? Math.min((currentScore / totalScore) * 100, 100) : 0;
  const scoreBarStyle = { "--score-progress": `${scoreProgress}%` } as CSSProperties;

  return (
    <section id="data-section">
      <div id="level">
        <div className="data-desc">Current Level</div>
        <div id="level-count">{level}</div>
      </div>
      <div id="score">
        <div className="container">
          <div className="data-desc">Current Score</div>
          <div id="score-count">{currentScore}/{totalScore}</div>
        </div>
        <div id="score-bar" style={scoreBarStyle}></div>
      </div>
      <div id="highscore">
        <div className="data-desc">Best Score</div>
        <div id="highscore-count">{bestScore}</div>
      </div>
      <div id="remaining">
        <div className="data-desc">Remaining</div>
        <div id="remaining-count">{totalScore - currentScore}</div>
      </div>
    </section>
  )
}

export default Data;
