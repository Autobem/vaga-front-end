import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  pokemon: any = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      if (this.pokemonService.pokemons.length) {
        this.pokemon = this.pokemonService.pokemons.find(i => i.name === params.name);
      }
        this.pokemonService.get(params.name).subscribe(response => {
        this.pokemon = response;
      }, error => console.log('Error:', error));
    });
  }
  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
