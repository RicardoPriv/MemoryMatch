import Title from "./title.tsx"
import Data from "./data.tsx"
import NewGame from "./newgame.tsx"
import "../../styles/analytics/index.css"

function Analytics() {
  return (
    <section id="analytics-container">
      <Title />
      <Data />
      <NewGame />
    </section>

  )
}

export default Analytics;
