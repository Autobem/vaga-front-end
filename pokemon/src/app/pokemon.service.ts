import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private api: string = "http://pokeapi.co/api/v2/pokemon";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retorna todos os pokemons
   */
  getAll(): Observable<Pokemon[]> {
    const url = `${this.api}?offset=0&limit=151`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPokemons)
    )
  }

  getByNameOrId(search: string): Observable<Pokemon> {
    const url = `${this.api}/${search}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPokemon)
    )
  }


  //METODOS PRIVADOS
  private jsonDataToPokemons(jsonData: any[]): Pokemon[] {
    console.log(jsonData);
    const pokemons: Pokemon[] = [];
    jsonData['results'].forEach(element => pokemons.push(Object.assign(new Pokemon(), element)));
    return pokemons;
  }

  private jsonDataToPokemon(jsonData: any): Pokemon {
    return Object.assign(new Pokemon(), jsonData);
  }

  private handleError(erro: any): Observable<any> {
    return throwError(erro);
  }
}
