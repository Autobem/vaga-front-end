import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonListService } from './pokemon-list.service';

import { PokeAPI, PokemonDetails, Results } from './../../../interface/pokemon';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  @Output() exportPokemons = new EventEmitter();
  pokemonsLoaded: boolean;


  pokemons: PokeAPI;

  bsModalRef: BsModalRef;
  
 p: number = 1;
 term: string = '';

  constructor(private pokemonListService: PokemonListService, 
    private pokemonService: PokemonService, private modalService: BsModalService) { 
    this.pokemonListService.setBrowserTitle();
   
  }

  ngOnInit(){
    // this.getPokemon()
    // console.log(this.pokemon$)
    // console.log('1234')
    this.getPokemons();
    this.pokemonsLoaded = false
  }

  search(term){
    this.pokemonListService.searchService(term);
  }

  getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        // get pokemon details for every pokemon
        this.pokemons.results.forEach(pokemon => {
          // set pokemon id
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];

          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }

  getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        // send pokemons to header component
        // if (pokemon.id === '151') {
        //   this.pokemonsLoaded = true;
        //   this.exportPokemons.emit(this.pokemons.results);
        // }
      });
  }

  getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some(flavor => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(PokemonDetailsComponent);
    this.bsModalRef.content.closeBtnName = 'Close'; 
  }
  


}
