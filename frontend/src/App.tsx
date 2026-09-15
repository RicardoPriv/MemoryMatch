import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'
import type { PokemonData } from './types/pokemonData'
import { fetchPokemonData } from './api/pokemonApi'

const cardCount = 10;

function App() {
  const [cardsData, setCardData] = useState<PokemonData[]>([])


  useEffect(() => {
    async function loadData(id: number) {
      try {
        const data = await fetchPokemonData(id);

        const pokemonCard: PokemonData = {
          id: data.id,
          name: data.name,
          types: data.types.map((typeData: { type: { name: string } }) => typeData.type.name),
          sprite: data.sprites.front_default
        }

        setCardData((previous) => {
          return [...previous, pokemonCard]
        });
      } catch (error) {
        return "";
      }
    }


    for (let i = 0; i < cardCount; i++) {
      let seed: number = Math.floor(Math.random() * 151) + 1;
      loadData(seed);
    }
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
