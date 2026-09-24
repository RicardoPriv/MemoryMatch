import type { PokemonData } from "@/types/pokemonData"
import type { PokemonCard } from "@/types/pokemonCard"
const API_URL = "https://pokeapi.co/api/v2/pokemon/"

export interface PokeApiPokemon {
  id: number,
  name: string,
  types: Array<{
    type: {
      name: string
    }
  }>,
  sprites: {
    front_default: string
  }
}

async function fetchPokemonData(id: number): Promise<PokeApiPokemon> {
  const encodedInput = encodeURIComponent(id);
  const url = `${API_URL}${encodedInput}`;

  const response = await fetch(url);
  if (!response.ok) { throw new Error("Failed to retrieve Pokemon data"); }

  return await response.json() as PokeApiPokemon;
}

export async function loadData(id: number): Promise<PokemonCard | null> {
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

