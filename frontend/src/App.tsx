import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'
import GameWon from './components/status/gameWon'
import GameOver from './components/status/gameOver'
import type { PokemonData } from './types/pokemonData'
import type { PokemonCard } from './types/pokemonCard'
import type { GameState } from './types/gameState'
import { fetchPokemonData } from './api/pokemonApi'
import { GAME_STATUS } from './config/status'

const cardCount = 10;
const maxLoadAttempts = cardCount * 5;
const gs = {
  cardsData: [],
  currentScore: 0,
  bestScore: 0,
  status: GAME_STATUS.IDLE
}
const scoreGain = 1;

function App() {
  const [gameState, setGameState] = useState<GameState>(gs)

  function startNewGame() {
    async function loadData(id: number): Promise<PokemonCard | null> {
      try {
        const data = await fetchPokemonData(id);

        const pokemonCard: PokemonData = {
          id: data.id,
          name: data.name,
          types: data.types.map((typeData) => typeData.type.name),
          sprite: data.sprites.front_default
        }

        return {
          pokemon: pokemonCard,
          clicked: false
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async function loadXCards(x: number) {
      let i: number = 0;
      let attempts: number = 0;
      const cardsData: Array<PokemonCard> = []
      const selectedIDs: Array<number> = []
      setGameState((previous) => {
        return {
          ...previous,
          status: GAME_STATUS.LOADING
        }
      })

      while (i < x && attempts < maxLoadAttempts) {
        attempts++;
        const seed: number = Math.floor(Math.random() * 151) + 1;

        if (!selectedIDs.includes(seed)) {
          const pokemonCard: PokemonCard | null = await loadData(seed);

          if (pokemonCard) {
            cardsData.push(pokemonCard);
            selectedIDs.push(seed);
            i++;
          }
        };
      }

      if (cardsData.length < x) {
        setGameState((previous) => {
          return {
            ...previous,
            status: GAME_STATUS.ERROR
          }
        })
        return;
      }

      setGameState((previous) => {
        return {
          cardsData: cardsData,
          currentScore: gs.currentScore,
          bestScore: previous.bestScore,
          status: GAME_STATUS.PLAYING
        }
      })
    }

    loadXCards(cardCount);
  }

  function handleCardClick(cardIndex: number) {
    const shuffle = [...gameState.cardsData];

    if (shuffle[cardIndex].clicked) {
      setGameState((previous) => {
        return {
          ...previous,
          status: GAME_STATUS.LOST
        }
      })
      return;
    } else {
      shuffle[cardIndex].clicked = true;
    }

    for (let i = shuffle.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      const temp = shuffle[i];
      shuffle[i] = shuffle[randomIndex];
      shuffle[randomIndex] = temp;
    }

    setGameState((previous) => {
      let bs = previous.bestScore;
      let st = previous.status;
      if (bs < previous.currentScore + scoreGain) { bs = previous.currentScore + scoreGain; }
      if (previous.currentScore + scoreGain === previous.cardsData.length) {
        st = GAME_STATUS.WON;
      }

      return {
        cardsData: shuffle,
        currentScore: previous.currentScore + scoreGain,
        bestScore: bs,
        status: st
      }
    });
  }

  useEffect(() => {
    startNewGame();
  }, [])

  function loading() { return (gameState.status === GAME_STATUS.LOADING) }
  function playing() { return (gameState.status === GAME_STATUS.PLAYING) }
  function error() { return (gameState.status === GAME_STATUS.ERROR) }
  function gameWon() { return (gameState.status === GAME_STATUS.WON) }
  function gameOver() { return (gameState.status === GAME_STATUS.LOST) }

  return (
    <main>
      <Header />
      <Analytics totalScore={gameState.cardsData.length * scoreGain} currentScore={gameState.currentScore} bestScore={gameState.bestScore} handleNewGameClick={startNewGame} />
      {loading() && <h2 className="board-surface loading-text">Loading...</h2>}
      {error() && <h2 className="board-surface loading-text">Unable to load Pokemon data.</h2>}
      {playing() && <MatchBoard cardsData={gameState.cardsData} handleCardClick={handleCardClick} />}
      {gameWon() && <GameWon />}
      {gameOver() && <GameOver startOverClick={startNewGame} />}
    </main>
  )
}

export default App
