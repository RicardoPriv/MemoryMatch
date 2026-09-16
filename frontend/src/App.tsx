import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'
import type { PokemonData } from './types/pokemonData'
import type { PokemonCard } from './types/pokemonCard'
import type { GameState } from './types/gameState'
import { fetchPokemonData } from './api/pokemonApi'

const cardCount = 10;
const gs = {
  cardsData: [],
  currentScore: 0,
  bestScore: 0
}

function App() {
  const [gameState, setGameState] = useState<GameState>(gs)

  useEffect(() => {
    async function loadData(id: number): Promise<PokemonCard | null> {
      try {
        const data = await fetchPokemonData(id);

        const pokemonCard: PokemonData = {
          id: data.id,
          name: data.name,
          types: data.types.map((typeData: { type: { name: string } }) => typeData.type.name),
          sprite: data.sprites.front_default
        }

        return {
          pokemon: pokemonCard,
          clicked: false
        };
      } catch (error) {
        return null;
      }
    }

    async function loadXCards(x: number) {
      let i: number = 0;
      const cardsData: Array<PokemonCard> = []
      const selectedIDs: Array<number> = []

      while (i < x) {
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

      setGameState((previous) => {
        return {
          cardsData: cardsData,
          currentScore: previous.currentScore,
          bestScore: previous.bestScore
        }
      })
    }

    loadXCards(cardCount);
  }, [])

  function handleCardClick() {
    const shuffle = [...gameState.cardsData];

    for (let i = shuffle.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      const temp = shuffle[i];
      shuffle[i] = shuffle[randomIndex];
      shuffle[randomIndex] = temp;
    }

    setGameState((previous) => {
      return {
        cardsData: shuffle,
        currentScore: previous.currentScore + 1,
        bestScore: previous.bestScore
      }
    });
  }

  return (
    <main>
      <Header />
      <Analytics totalScore={gameState.cardsData.length} currentScore={gameState.currentScore} bestScore={gameState.bestScore} />
      <MatchBoard cardsData={gameState.cardsData} handleCardClick={handleCardClick} />
    </main>
  )
}

export default App

