import { Results } from './api-list';
import { PokeSpecie } from './pokespecie';

interface Types {
  slot: number;
  type: Results;
}

interface Sprites {
  back_default?: string;
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  species: Results;
  stats: {base_stat: number, stat: Results }[];
  types: Types[];
  abilities: {ability: Results}[];
  evolutionPopulated?: Results[];
  speciePopulated?: PokeSpecie;
}
