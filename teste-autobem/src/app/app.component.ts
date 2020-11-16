import { Component } from '@angular/core';
import { Results } from './interface/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-autobem';
  public search: string;
  public typeFilter: string;

  public pokemons: Array<Results>;


  newPokemonSearch(search: string): void {
    if (this.search !== search) {
      this.search = search;
    }
  }

  newTypeSelected(filter: string): void {
    if (this.typeFilter !== filter) {
      this.typeFilter = filter;
    }
  }

  exportPokemons(pokemons: Array<Results>): void {
    if (this.pokemons !== pokemons) {
      this.pokemons = pokemons;
    }
  }
  
}
