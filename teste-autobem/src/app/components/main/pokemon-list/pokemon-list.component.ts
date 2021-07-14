import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { style, trigger, transition, animate, query, stagger } from '@angular/animations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { PokemonService } from 'src/app/services/pokemon.service';
import { PokeAPI, PokemonDetails, Results } from './../../../interface/pokemon';
import { ModalService } from 'src/app/services/modal.service';


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
  query: string;
  typeFilters: string;

  @Input() set search(newSearch: string) {
    if (newSearch !== this.query) {
      this.query = newSearch;
      this.p = 1;
    }
  }
  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.typeFilters = type;
      this.p = 1;
    }
  }



  constructor(
    private pokemonService: PokemonService, 
    private modalService: BsModalService,
    private modal: ModalService) {   
  }

  ngOnInit(){
    this.getPokemons();
    this.pokemonsLoaded = false
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
        if (pokemon.id === '151') {
          this.pokemonsLoaded = true;
          this.exportPokemons.emit(this.pokemons.results);
        }
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
}
