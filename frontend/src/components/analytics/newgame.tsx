import "@/styles/analytics/NewGame.css"

type NewGameProps = {
  handleNewGameClick: () => void
}

function NewGame({ handleNewGameClick }: NewGameProps) {
  return (
    <button id="newgame-button" className="primary-action" onClick={() => handleNewGameClick()}>
      <div id="newgame-text">New Game</div>
    </button>
  )
}

export default NewGame;
