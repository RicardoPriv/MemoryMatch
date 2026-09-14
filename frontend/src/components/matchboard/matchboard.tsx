import type { PokemonData } from "@/types/pokemonData";


type MatchBoardProps = {
  cardsData: PokemonData[]
}

function MatchBoard({ cardsData }: MatchBoardProps) {
  const hasCardData = cardsData.some((item) => {
    return Object.values(item).some((value) => value.length > 0)
  })

  return (
    <section id="matchboard-container">
      {hasCardData && `${cardsData[0].id} | ${cardsData[0].name} | ${cardsData[0].sprite}`
      }
    </section>
  )
}

export default MatchBoard;
