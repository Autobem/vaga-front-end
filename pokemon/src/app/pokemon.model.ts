import { PokemonSprites } from './pokemon-sprites.model';
import { PokemonTypes } from './pokemon-types.model';

export class Pokemon {
    constructor(
        public id?: number,
        public name?: string,
        public base_experience?: number,
        public height?: number,
        public weight?: number,
        public types?: PokemonTypes[],
        public sprites?: PokemonSprites,
    ) { }

    get sprite(): string {
        return this.sprites.front_default;
    }

    get typeText(): string {
        let retorno = '';
        this.types.forEach(e => {
            retorno = retorno + e.type.name;
        })
        return retorno;
    }
}
