import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Poke.io';
  public inputValue = "";
  public pokemonSearched: Pokemon;
  public offset;
  public limit;

  constructor(private _pokemonService: PokemonService, private http: HttpClient) {
    this.offset = 0;
  }

  //Funções para seguir e voltar páginas
  nextPage(value){
    this.offset += value;
    console.log(this.offset);
    
  }
  previousPage(value){
    this.offset -= value;
    console.log(this.offset);
  }

  //Função para busca do pokemon por nome ou id
  onEnter(value: string) {
    value = value.toLocaleLowerCase();
    this._pokemonService.getPokemonByName(value)
      .subscribe(data =>{
        this.pokemonSearched = new Pokemon(
        data['id'], 
        data['name'], 
        data['sprites']['front_default'], 
        (data['types']).map(type => type.type.name),
        "")
      }, error => console.error(error));


    this._pokemonService.getFlavorTextByName(this.pokemonSearched.nome)
      .subscribe(data =>{
        (data['flavor_text_entries']).forEach(e => {
          if (e.language.name === "en"){
            this.pokemonSearched.desc = e.flavor_text;
          }
        })
      }, error => console.error(error));
  }

  }