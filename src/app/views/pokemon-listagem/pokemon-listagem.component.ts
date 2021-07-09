import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon.service';



@Component({
  selector: 'app-pokemon-listagem',
  templateUrl: './pokemon-listagem.component.html',
  styleUrls: ['./pokemon-listagem.component.css']
})
export class PokemonListagemComponent implements OnInit {

  tipos: any[] = [];
  pokemons: any[] = [];
  page = 1;
  totalPokemons!: number;

  constructor(
    private pokemonService: PokemonService 
  ) { }

  
  ngOnInit(): void {
    this.listarPokemons();
    this.buscarTipos();
    this.listFire();
  }

  listarPokemons() {
    this.pokemonService.listarPokemons(12, this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemons = response.count;
      
      response.results.forEach((result:any) => {
        this.pokemonService.informarPokemon(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
        });
      });
      // console.log(this.pokemons);
    });
  }

  buscarTipos() {
    this.pokemonService.buscarTipos().
    subscribe((response:any) => {
      this.tipos = response.results;
      // console.log(this.tipos);
    });
  }

  listFire() {
    this.pokemonService.buscarTipos().
    subscribe((response:any) => {
      this.tipos = response.results;
      // console.log(this.tipos);

      // response.results.forEach(() => {
      //   this.pokemonService.listFire()
      //   .subscribe((uniqResponse: any) => {
      //     this.pokemons.push(uniqResponse);
      //   });
      // });
    });
  }

}
