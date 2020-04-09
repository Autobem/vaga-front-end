export class Pokemon {
    abilities: Abilities[];
    base_experience: number;
    forms: Data[];
    game_indices: GameIndices[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    local_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: Data;
    sprites: Sprite;
    stats: Stat[];
    types: Type[];
    weight: number;

    constructor(){
        this.sprites = new Sprite();
    }
}

class Abilities {
    is_hidden: boolean;
    slot: number;
    ability: Data;
}

class GameIndices {
    game_index: number;
    version: Data;
}

class HeldItem {
    item: Data;
    version_details: VersionDetail[];
}

class VersionDetail {
    rarity: number;
    version: Data;
}

class Move {
    move: Data;
    version_group_details: VersionGroupDetails[];
}

class VersionGroupDetails {
    level_learned_at: number;
    move_learn_method: Data;
    version_group: Data;
}

class Sprite {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

class Stat {
    base_stat: number;
    effort: number;
    stat: Data;
}

class Type {
    slot: number;
    type: Data;
}

class Data{
    name: string;
    url: string;
}
