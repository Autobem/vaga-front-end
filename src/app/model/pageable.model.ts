import { PokemonResult } from './pokemon-result.model';

export class Pageable {
    count: number;
    next: string;
    previous: string;
    results: PokemonResult[];
}
