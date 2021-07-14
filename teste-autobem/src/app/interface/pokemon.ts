export interface Results {
  name: string;
  url: string;
  id?: string;
  details?: PokemonDetails;
  description?: string;
}

export interface PokeAPI {
  count: number;
  next: string;
  results: Results[];
}

export interface PokemonDetails {
  name: string;
  id: number;
  sprites: Sprites;
  abilities?: Array<any>;
  types?: Array<any>;
}

export interface Sprites {
  front_default: string;
}