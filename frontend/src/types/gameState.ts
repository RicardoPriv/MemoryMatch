import type { PokemonCard } from "./pokemonCard";

export interface GameState {
  cardsData: Array<PokemonCard>,
  currentScore: number,
  bestScore: number,
}
