import type { PokemonCard } from "@/types/pokemonCard";
import type { Level } from "./levels";
import { loadData } from "@/api/pokemonApi";
import { CARDS_PER_LEVEL, GENERATIONS_RANGES, MAX_LEVELS } from "./levels";

export function getCardCountForLevel(level: number): number {
  return CARDS_PER_LEVEL * level;
}

export function getGenerationRangeForLevel(currentLevel: number): { start: number, end: number } {
  let lower_bound, upper_bound: number;

  if (currentLevel >= 1 && currentLevel <= MAX_LEVELS) {
    lower_bound = GENERATIONS_RANGES[currentLevel as Level].start;
    upper_bound = GENERATIONS_RANGES[currentLevel as Level].end;
  }
  else {
    lower_bound = GENERATIONS_RANGES[1].start;
    upper_bound = GENERATIONS_RANGES[MAX_LEVELS as Level].end;
  }

  return { start: lower_bound, end: upper_bound };
}

export function getRandomPokemonID(lower_bound: number, upper_bound: number): number {
  return Math.floor(Math.random() * (upper_bound - lower_bound + 1)) + lower_bound;
}

export function shuffleCards(cards: Array<PokemonCard>) {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

export async function loadXCards(maxFailedAttempts: number, currentLevel: number): Promise<Array<PokemonCard>> {
  let i: number = 0;
  let attempts: number = 0;
  const cardsData: Array<PokemonCard> = []
  const selectedIDs: Array<number> = []

  const levelRanges: { start: number, end: number } = getGenerationRangeForLevel(currentLevel);

  while (i < getCardCountForLevel(currentLevel) && attempts < maxFailedAttempts) {
    const seed = getRandomPokemonID(levelRanges.start, levelRanges.end);

    if (!selectedIDs.includes(seed)) {
      const pokemonCard: PokemonCard | null = await loadData(seed);

      if (pokemonCard) {
        cardsData.push(pokemonCard);
        selectedIDs.push(seed);
        i++;
      } else { attempts++; }
    } else { attempts++; }

  }

  return cardsData;
}




