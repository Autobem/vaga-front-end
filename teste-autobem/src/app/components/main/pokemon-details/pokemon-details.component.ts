import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
@ViewChild('childModal', { static: false }) childModal: ModalDirective;

modalRef: BsModalRef;

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService,
    private title: Title) {
      // this.pokemon = this.activatedRouter.params.pipe(
      //   distinctUntilChanged(),
      //   mergeMap(params => this.getPokemon(params.id) as Observable<Pokemon>),
      //   tap(pokemon => this.title.setTitle(`Pokémon #${pokemon.id} ${pokemon.name}`))
      // );
      this.activatedRouter.params.subscribe(
        params => this.getPokemon(params.id))
      
      }

  ngOnInit(): void {
  }

  // private getPokemon(id: string) {
  //   return this.pokemonService.pokemon.pipe(map(pokemon => pokemon.find(p => p.id === +id)));
  // }

  getPokemon(id) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      err => {
        console.log(err);
      }
    )
  }


  showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }
}


