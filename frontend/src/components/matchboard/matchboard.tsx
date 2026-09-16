import type { PokemonCard } from "@/types/pokemonCard";
import Matchcard from "./matchcard";

type MatchBoardProps = {
  cardsData: PokemonCard[],
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>
}

function MatchBoard({ cardsData, handleCardClick }: MatchBoardProps) {
  const hasCardData = cardsData.length > 0;

  return (
    <section id="matchboard-container">
      {hasCardData && cardsData.map((cardData, index) => {
        return <Matchcard key={index}
          id={cardData.pokemon.id}
          name={cardData.pokemon.name}
          types={cardData.pokemon.types}
          sprite={cardData.pokemon.sprite}
          handleCardClick={handleCardClick} />
      })}
    </section>
  )
}

export default MatchBoard;
