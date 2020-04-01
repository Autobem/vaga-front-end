import { Component, OnInit, Input, SimpleChange, SimpleChanges, KeyValueChanges, IterableChanges, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input() public parentData;
  public nomes: any = [];
  public tipoTelas: [];
  public keys: string[];
  public todosPokemons: Pokemon[] = [];
  @Input() public offset;
  @Input() public limit = 20;


  constructor(private _pokemonService: PokemonService) { 
    
  }

  //Função para popular a tela com os pokemons para exibição
  populatePage(offset, limit){
    this.offset = offset;
    this.limit = limit;
    this.todosPokemons= [];
    this.nomes= [];
    //Buscar todos os pokemons da lista inicial com 20 exemplos
    this._pokemonService.getTodosPokemons(this.offset, this.limit)
    .subscribe(data => {
      this.nomes = data['results'];

      //Buscar id, nome, foto e tipos
      this.nomes.forEach(element => {
        this._pokemonService.getPokemonByName(element.name)
          .subscribe(data => {
            this.todosPokemons[data['id']] = new Pokemon(
              data['id'], 
              data['name'], 
              data['sprites']['front_default'], 
              (data['types']).map(type => type.type.name),
              "");
              
              //Buscar descrição
              this.todosPokemons.forEach(element => {
                this._pokemonService.getFlavorTextByName(element.nome)
                  .subscribe(data =>{
                    (data['flavor_text_entries']).forEach(e => {
                      if (e.language.name === "en"){
                        element.desc = e.flavor_text;
                      }
                    });
                  })
                
              });

            this.keys = Object.keys(this.todosPokemons);
          })
      });
    }, error => console.error(error));
  }

  //Ao carregar o componente invcar a função de popular a tela com os parâmetros iniciais
  ngOnInit(): void {
    this.populatePage(this.offset, this.limit);
  }

  //Ao se alterar a paginação atualizar a tela
  ngOnChanges(changes: SimpleChange) {

      for(let offset in changes){
        this.populatePage(changes[offset].currentValue, this.limit)    
      } 
  }

}

