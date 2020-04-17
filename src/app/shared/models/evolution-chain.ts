import { Results } from './api-list';


interface Chain {
  evolves_to: Chain[];
  is_baby: boolean;
  species: Results;
}

export interface EvolutionChain {
  chain: Chain;
}
