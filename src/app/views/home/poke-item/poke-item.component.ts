import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-poke-item',
  templateUrl: './poke-item.component.html',
  styleUrls: ['./poke-item.component.css']
})
export class PokeItemComponent implements OnInit {

  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
  ) {

  }

  pokemon = null;

  onChangePokemon = data => {
    this.pokemon = data;
  }

  parseInt = value => {
    return parseInt(value);
  }

  onLoad() {
    this.route.params.subscribe(
      (params) => {
        this.pokeService.getPokemon(params['id']).subscribe(data => {
          this.onChangePokemon(data);
          console.log(data);
        });
      });
  }

  ngOnInit(): void {
    this.onLoad();
  }

}
