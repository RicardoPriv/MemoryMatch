import Title from "./title.tsx"
import Data from "./data.tsx"
import NewGame from "./newgame.tsx"
import "../../styles/analytics/index.css"

type AnalyticsProps = {
  level: number,
  totalScore: number,
  currentScore: number,
  bestScore: number,
  handleNewGameClick: () => void
}

function Analytics({ level, totalScore, currentScore, bestScore, handleNewGameClick }: AnalyticsProps) {
  return (
    <section id="analytics-container">
      <Title />
      <Data level={level} totalScore={totalScore} currentScore={currentScore} bestScore={bestScore} />
      <NewGame handleNewGameClick={handleNewGameClick} />
    </section>

  )
}

export default Analytics;
