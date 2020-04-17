import { Results } from './api-list';
import { Pokemon } from './pokemon';

export interface PokeSpecie {
  base_happiness: number;
  capture_rate: number;
  color: Results;
  habitat: Results;
  growth_rate: Results;
  evolution_chain: { url: string };
  varieties: { is_default: boolean; pokemon: Results }[];
}
