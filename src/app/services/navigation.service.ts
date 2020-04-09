import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  selectedPokemon: Pokemon = {};
  pokemonHasBeenSelected: boolean = false;
  visitedPokedex: boolean = false;

  currentContent: {
    pages: Array<Array<Pokemon>>,
    array: Array<Pokemon>,
    sort: string,
    currentPage: number,
    typeSearch: boolean,
    typeSelected: number,
    input: string,
    count: number
  } = { pages: [], array: [], sort: '', currentPage: 0, typeSearch: false, typeSelected: 0, input: '', count: 0 }

  constructor() { }

  setSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  setCurrentContent(pages: Array<Array<Pokemon>>, array: Array<Pokemon>,
    sort: string, currentPage: number, typeSearch: boolean, typeSelected: number, input: string,  count: number) {

    this.currentContent.pages = pages;
    this.currentContent.array = array;
    this.currentContent.sort = sort;
    this.currentContent.currentPage = currentPage;
    this.currentContent.typeSearch = typeSearch;
    this.currentContent.typeSelected = typeSelected;
    this.currentContent.input = input;
    this.currentContent.count = count;
  }

  getSelectedPokemon(): Pokemon {
    return this.selectedPokemon;
  }

  getCurrentContent() {
    return this.currentContent;
  }

}
