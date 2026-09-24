# Potential Future Improvements

These are optional ideas for later polish. The core memory-card gameplay and level flow are already in place.

## Data Loading

- Add a lightweight PokeAPI cache so reloading levels or revisiting Pokemon does not always make a network request.
- Consider preloading the next level after a win screen appears.
- Add retry/backoff behavior for failed Pokemon requests instead of counting every failure equally.

## Game Flow

- Move the loose reload-level error button into a dedicated error/status component if the error state becomes more important.
- Consider showing a small level transition state before the next board appears.
- Endless levels currently cap at 20 cards; consider whether they should reuse all Pokemon, final-generation Pokemon, or a rotating generation pattern.

## Scoring

- Keep cumulative score across levels, but consider adding a separate per-level score/history display later.
- Consider tracking longest streak, highest level reached, or total Pokemon logged.

## UI Polish

- Add a compact loading indicator that shows the target level.
- Add small motion/transition polish when cards shuffle or when a new level loads.
- Refine responsive board sizing after testing on more viewport sizes.

## Architecture

- Extract score/status calculation from `App.tsx` if the component gets crowded.
- Add a small suite of unit tests for game logic helpers such as card counts, generation ranges, and shuffling.
- Revisit the ignored hook dependency warning after the project is further along.
