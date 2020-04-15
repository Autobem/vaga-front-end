import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, flatMap, mergeMap, tap, mergeMapTo, switchMap } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon';
import { ApiList, Results } from '../shared/models/api-list';


const API = 'https://pokeapi.co/api/v2/';

// const pok: Pokemon = {
//   id: 1,
//   name: 'string',
//   height: 2,
//   weight: 3,
//   abilities: { ability: { name: 'asdasd', url: 'asdasdasd' } }
// };

@Injectable({ providedIn: 'root' })



export class SearchingFectherService {

  constructor(private http: HttpClient) { }

  fethTypes(): Observable<string[]> {
    return this.http.get<ApiList>(API + 'type')
      .pipe(
        map(resp => {
          return resp.results.map(type => type.name);
        }));
  }

  pokemonList(): Observable<Results[]> {
    return this.http.get<ApiList>(API + 'pokemon')
      .pipe(map(resp => resp.results));
  }

  // pokemonView(): Observable<Pokemon[]> {
  //   return this.http.get<ApiList>(API + 'type')
  //     .pipe(map(resp =>
  //       resp.results.map(result =>
  //         this.fetchPokemon(result.url))
  //     ));
  // }

  fetchPokemonsPreview(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  fetchPokemon(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

}

