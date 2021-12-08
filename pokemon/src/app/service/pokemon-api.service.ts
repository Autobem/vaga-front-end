import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private urlBuscaTodosPokemons: string =
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(private http: HttpClient) {}

  buscaTodosPokemons(): Observable<any> {
    return this.http.get<any>(this.urlBuscaTodosPokemons);
  }

  public buscarUnicoPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
