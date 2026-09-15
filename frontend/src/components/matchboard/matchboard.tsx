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
      {hasCardData && <Matchcard id={cardsData[0].id} name={cardsData[0].name} types={cardsData[0].types}
        sprite={cardsData[0].sprite} />}
    </section>
  )
}

export default MatchBoard;
