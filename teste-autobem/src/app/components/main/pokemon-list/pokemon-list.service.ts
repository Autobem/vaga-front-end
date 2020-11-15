import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

  // readonly pokemon$: Observable<Pokemon[]>;
  searchedTerms = new Subject<string>();

  constructor(private title: Title, private pokemonService: PokemonService) { 
    // this.pokemon$ = this.pokemonService.pokemon$.pipe(
    //   switchMap(pokemon => this.searchedTerms.pipe(
    //     map(term => this.filter(pokemon, term)),
    //     startWith(pokemon)
    //   ))
    // )
  }

  setBrowserTitle(){
    this.title.setTitle('Buscar Pokémons!')
  }

  searchService(term){
    this.searchedTerms.next(term)
  }

  // private filter(pokemon: Pokemon[], value: string) {
  //   return pokemon.filter(p => value ? p.name.toLowerCase().includes(value.toLowerCase()) : pokemon);
  // }

}
