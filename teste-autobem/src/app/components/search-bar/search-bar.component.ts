import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Results } from 'src/app/interface/pokemon';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{


  @Output() searchChange = new EventEmitter();
  @Output() typeSelected = new EventEmitter();


  search: string;
  types: Array<string>;
  pokemonList: Array<Results>;
  currentType: string;
  currentAbilities: Array<string>;


  @Input() set pokemons(pokemons: Results[]) {
    if (pokemons !== this.pokemonList) {
      this.pokemonList = pokemons;
      
      this.pokemonList.forEach(pokemon => {
        // this.setPokemonAbilities(pokemon);
        this.setPokemonTypes(pokemon);
      });
    }
  }


  constructor() { }

  ngOnInit(): void {
    this.types = []
  }

  searchEvent(search): void {
    // check for cleared search
    if (search === '') {
      this.search = search;
    }
    this.searchChange.emit(this.search);
  }

  onTypeSelected(): void {
    if (this.currentType) {
      this.typeSelected.emit(this.currentType);
    } else {
      this.typeSelected.emit('');
    }
  }

  setPokemonTypes(pokemon: Results): void {
    if (pokemon) {
      pokemon.details.types.forEach(type => {
        const typeName = type.type.name;
        if (!this.types.includes(typeName)) {
          this.types.push(typeName);
          this.types.sort();
        }
      });
    }
  }



}
