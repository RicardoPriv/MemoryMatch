import "@/styles/matchboard/matchcard.css"

type MatchcardProps = {
  id: number,
  name: string,
  types: Array<string>,
  sprite: string
}

function Matchcard({ id, name, types, sprite }: MatchcardProps) {
  return (
    <button className="matchcard-container">
      <div className="pokemon-charateristics">
        <div className="pokemon-id">{id}</div>
        <div className="types">
          {
            types.map((type, index) => {
              return (<div className="pokemon-type" key={index}>{type}</div>)
            })
          }
        </div>
      </div>
      <img id="pokemon-sprite" src={sprite}></img>
      <div id="pokemon-name">{name}</div>
    </button>
  )
}

export default Matchcard;
