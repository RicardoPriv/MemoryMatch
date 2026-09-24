export const MAX_LEVELS: number = 9;
export const CARDS_PER_LEVEL: number = 3;

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const GENERATIONS_RANGES = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
  9: { start: 906, end: 1025 },
}
