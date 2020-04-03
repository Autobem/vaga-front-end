import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  selectedPokemon: Pokemon = {};
  pokemonHasBeenSelected: boolean = false;
  visitedPokedex: boolean = false;

  constructor() { }

  setSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  getSelectedPokemon(): Pokemon {

    return this.selectedPokemon;


  }

}
