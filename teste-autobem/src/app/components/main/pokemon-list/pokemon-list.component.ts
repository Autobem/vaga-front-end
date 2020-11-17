import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { style, trigger, transition, animate, query, stagger } from '@angular/animations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { PokemonService } from 'src/app/services/pokemon.service';
import { PokeAPI, PokemonDetails, Results } from './../../../interface/pokemon';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  animations: [
    trigger('itemAnim', [ //selector used by template
      //ENTRY ANIMATION
      transition('void => *', [ //ANIMATION SURGERY - NON EXISTING => ANY STATE 
        //INITIAL STATE
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0)',
          'margin-bottom': 0,

          //INITIAL STATE BEFORE EXPAND PADDING PROPERTIES
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        // FIRST ANIMATE THE SPACING (INCLUDES HEIGHT AND MARGIN)
        animate('100ms', style({
          height: '*', //means the height of the DOM element
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        //ANIMATE THE FINAL STATE
        animate(150)
      ]),

      // CLOSING ANIMATION
      transition('* => void', [ // animation disappearing, any state => void
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then back to normal size & beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75,
        })),
        // scale down & fade out completely
        animate('120ms',style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        //THEN ANIMATE THE SPACING (HEIGHT, MARGIN, PADDING) - TOTAL DISAPPEARING 
        animate('150ms', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])
    ])
  ]
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
