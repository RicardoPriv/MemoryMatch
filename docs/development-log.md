# Development Log

## ~2h

- Set up the initial file structure.
- Renamed a few files to better suit the project.
- Added the header-related code.
- Added the analytics children:
  - `Title`: the title and subtitle that appear in the left sidebar.
  - `Data`: the tracking counts for current score, best score, and remaining, along with the log box.
  - `NewGame`: button at the bottom to initialize a new game.
- Note: analytics initially used static data. Dynamic changes based on user interaction were planned for a later point.
- Added CSS for the header, analytics, and the background of the main matching window.
- Added a `PokemonData` type for API data.
- Added the API function to fetch Pokemon data.
- Initially fetched only one Pokemon based on id, with plans to expand to multiple cards for the game.

## ~1h

- Created the card component to display Pokemon sprite, name, type, and id.
- Added a random generator to fetch any Pokemon between Pokedex entry 1 and `x`, initially set to the original 151.
- Looped the generation to fetch `cardCount`, initially 10, Pokemon and load them into state.
- Displayed all Pokemon cards on the matchboard.
- Removed `StrictMode` for development testing, because with it active the `useEffect` function loads twice on mount.

## ~2h

- Added functionality to clicking cards.
- Once clicked, a card cannot be clicked a second time.
- Current score, remaining, and best score update on click when appropriate.
- Added functionality to the New Game button so it starts a new game with new Pokemon when clicked.
- Refactored a good amount of logic:
  - Created new types.
  - Pulled code out of `useEffect` into a reusable `startNewGame` function.
  - Changed `hasCardData` to check the array length rather than the length of each item inside the array.
  - Relearned a few Vim movement keys in visual mode.
- Introduced new types:
  - `PokemonCard`: `{ pokemon: PokemonData, clicked: boolean }`
  - `GameState`: `{ cardsData: Array<PokemonCard>, currentScore: number, bestScore: number }`
- Removed the log box from the analytics panel.

## ~1h

- Finished the state changes.
- Game state now includes status values:
  - `ERROR`
  - `IDLE`
  - `LOADING`
  - `PLAYING`
  - `WON`
  - `LOST`
- Depending on the state, the main screen changes to reflect that state.
- Added relevant features for each state page, including messages, new game on loss, and resetting game state on loss.
- Added error handling.
- Implemented the API function return type.

## ~3h

- Refactored code.
- Moved logic helpers to their own file:
  - `getCardCountForLevel`
  - `getGenerationRangeForLevel`
  - `getRandomPokemonID`
  - `loadXCards`
- Moved `loadData` to `pokemonApi`.
- Added:
  - `loadLevel`
  - `handleNextLevel`
  - `reloadLevel`
- Added a button on load error to retry loading the level.
- Added levels:
  - New field in `GameState`.
  - Level progression from 1 to 9 increases the number of Pokemon shown in increments of 2, starting at 2.
  - By level 10, there are 20 cards, which is the current limit.
  - Each level loads Pokemon from the relevant generation.
  - Level 10 and onward loads 20 cards from any generation.
  - `levels.ts` contains most level configuration.
- Score changed to be cumulative across levels.
- Added `StrictMode` back in.
