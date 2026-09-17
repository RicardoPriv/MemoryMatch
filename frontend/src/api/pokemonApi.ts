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

export async function fetchPokemonData(id: number): Promise<PokeApiPokemon> {
  const encodedInput = encodeURIComponent(id);
  const url = `${API_URL}${encodedInput}`;

  const response = await fetch(url);
  if (!response.ok) { throw new Error("Failed to retrieve Pokemon data"); }

  return await response.json() as PokeApiPokemon;
}
