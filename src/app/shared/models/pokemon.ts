import { Results } from './api-list';

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
  types?: Types[];
  abilities?: {ability: Results};
  evolution?: Pokemon[];
}
