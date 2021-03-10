import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})

export class PokemonDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonFirstType = [];
  pokemonSecondType = [];
  pokemonFirstAbility = [];
  pokemonSecondAbility = [];
  pokemonImg = '';
  none: any = 'None';

  constructor(private router: Router, private pokemonService: PokemonService, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id'])
      }
    )
  }

  ngOnInit(): void {
  }

  getPokemon(id){
    this.pokemonService.getPokemons(id).subscribe(
      res => {

        if(res.types[1] != null)
          this.pokemonSecondType = res.types[1].type.name;
        else
          this.pokemonSecondType = this.none;

        if(res.abilities[1] != null)
          this.pokemonSecondAbility = res.abilities[1].ability.name;
        else
          this.pokemonSecondAbility = this.none;

        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonFirstType = res.types[0].type.name;
        this.pokemonFirstAbility = res.abilities[0].ability.name;
      },

      err => {
        console.log(err);
      }
    )
  }

  home(){
    this.router.navigateByUrl('/home');
  }
}