import type { PokemonCard } from "./pokemonCard";
import { GAME_STATUS } from "@/config/status";

export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS]

export interface GameState {
  cardsData: Array<PokemonCard>,
  currentScore: number,
  bestScore: number,
  status: GameStatus
}
