import type { PokemonData } from "@/types/pokemonData";
import Matchcard from "./matchcard";

type MatchBoardProps = {
  cardsData: PokemonData[]
}

function MatchBoard({ cardsData }: MatchBoardProps) {
  const hasCardData = cardsData.some((item) => {
    return Object.values(item).some((value) => value.length > 0)
  })

  return (
    <section id="matchboard-container">
      {hasCardData && cardsData.map((cardData, index) => {
        return <Matchcard key={index}
          id={cardData.id}
          name={cardData.name}
          types={cardData.types}
          sprite={cardData.sprite} />
      })}
    </section>
  )
}

export default MatchBoard;
