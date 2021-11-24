import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonApiService } from './../../service/pokemon-api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  private pokemonsFiltro: any[] = [];
  public pokemons: any[] = [];

  constructor(
    private pokemonApiService: PokemonApiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarPokemons();
  }

  listarPokemons(): void {
    this.pokemonApiService.buscaTodosPokemons().subscribe((resposta) => {
      const listaPokemons: any[] = resposta.results;
      this.pokemonsFiltro = resposta.results;
      this.buscarDetalhesPokemon(listaPokemons);
    });
  }

  buscarDetalhesPokemon(listaPokemons: any[]): void {
    listaPokemons.forEach((pokemon) => {
      this.pokemonApiService.buscarUnicoPokemon(pokemon.url).subscribe(
        //adiciona na lista
        (resposta) => {
          this.pokemons.push(resposta);
        },

        //em caso de erro
        (error) => console.log('ERROR', error),

        //após concluir
        () => {
          this.pokemonsFiltro = this.pokemons;
          this.ordenarListaPorNome();
        }
      );
    });
  }

  ordenarListaPorNome(): void {
    this.pokemons = this.pokemons.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : b.name.toLowerCase() > a.name.toLowerCase()
        ? -1
        : 0
    );
  }

  public pesquisar(value: string) {

  }

  abrirModal(pokemon: any): void {

  }
}
