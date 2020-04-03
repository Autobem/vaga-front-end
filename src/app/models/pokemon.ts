import { Move } from './move';
import { Stat } from './stat';

export interface Pokemon {

    id?: number,
    name?: string,
    types?: string[],
    sprite?: string,
    color?: string,
    moves?: Array<Move>,
    height?: number,
    weight?: number,
    abilities?: string[],
    stats?: Array<Stat>,
    evolutionChain?: string[];
    

}


