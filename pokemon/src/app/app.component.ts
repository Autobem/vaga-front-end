import { Component } from '@angular/core';

import { PokemonService } from '../app/services/pokemon.service'
import { ModalService } from './shared/modal.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon';

  listPokemon: any;
  pokemonName:String;
  listaConvertida = [];
  listPokemonByPage:any;
  isLink: Boolean = false;
  next:any;
  previous:any;
  listaPokemonPaginado = [];

  detalhesPokemon:any;
  pokemon: any;
  nome: any;
  altura: any;
  peso : any;

  constructor(private pokemonService: PokemonService, 
    private modalService: ModalService
    ){
    this.obterListPokemonsByPage();
  }

  obterPokemonByName(namePokemon: String){
     this.listPokemon = [];

      this.pokemonService.listName(namePokemon).subscribe(
        res => { this.listPokemon.push(res)
        })
  }

  obterDetalhesPokemos(detalhesPokemon: String){
      this.detalhesPokemon = [];

        this.pokemonService.listName(detalhesPokemon).subscribe(
          res => { this.detalhesPokemon.push(res);

            this.pokemon = res;
            this.nome = this.pokemon.name;
            this.altura = this.pokemon.height;
            this.peso = this.pokemon.weight;
          
            this.modalService.mostModal(`Nome: ${this.nome}`, `Altura: ${this.altura}`,`Peso: ${this.peso}`);
      }
        )
  }
  

  async obterByName(namePokemon: String){
    return this.pokemonService.listName(namePokemon)
  }

  obterListPokemonsByPage(link: String = ""){
        this.listaConvertida = [];
        this.listPokemonByPage = [];

        if(link != ""){
          this.isLink = true;
        }

        this.pokemonService.listByPage(link).subscribe(res => {
          this.listPokemonByPage.push(res);

          this.next = this.listPokemonByPage[0].next;
          this.previous = this.listPokemonByPage[0].previous;

          this.listaPokemonPaginado = this.listPokemonByPage[0].results;

          this.listaPokemonPaginado.forEach(async element => {
            let pokemon:any;

            (await this.obterByName(element.name)).subscribe(elem => {
              pokemon = elem;

              let srcImage = pokemon.sprites.front_default;
              this.convertToPokemons(element.name, srcImage)
            })
          });
        })
  }

  convertToPokemons(name, srcImage){
    this.listaConvertida.push({name: name, image: srcImage});
    console.log(this.listaConvertida);
  }


}
