import type { PokemonCard } from "@/types/pokemonCard";
import Matchcard from "./matchcard";

type MatchBoardProps = {
  cardsData: PokemonCard[],
  handleCardClick: (index: number) => void
}

function MatchBoard({ cardsData, handleCardClick }: MatchBoardProps) {
  const hasCardData = cardsData.length > 0;

  return (
    <section id="matchboard-container" className="board-surface">
      {hasCardData && cardsData.map((cardData, index) => {
        return <Matchcard key={cardData.pokemon.id}
          cardIndex={index}
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
