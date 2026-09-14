import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'
import type { PokemonData } from './types/pokemonData'
import { fetchPokemonData } from './api/pokemonApi'

function App() {
  const [cardsData, setCardData] = useState<PokemonData[]>([])


  useEffect(() => {
    async function loadData(id: number) {
      try {
        const data = await fetchPokemonData(id);

        const pokemonCard: PokemonData = {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default
        }

        const newState: PokemonData[] = [...cardsData, pokemonCard];
        setCardData(newState);
      } catch (error) {
        return "";
      }
    }

    loadData(1);
  }, [])

  return (
    <main>
      <Header />
      <Analytics />
      <MatchBoard cardsData={cardsData} />
    </main>
  )
}

export default App
