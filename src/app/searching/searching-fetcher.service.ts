import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, mergeMap } from 'rxjs/operators';
import { Observable, Subject, of, concat, merge } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon';
import { ApiList, Results } from '../shared/models/api-list';
import { PokeType } from '../shared/models/poketype';


const API = 'https://pokeapi.co/api/v2/';

@Injectable({ providedIn: 'root' })


export class SearchingFectherService {

  private apiSubject = new Subject<ApiList>();

  itemPerPage = 20;

  constructor(private http: HttpClient) { }

  getPagination() {
    return this.apiSubject.asObservable();
  }

  getPageNumber(resp: ApiList) {
    if (!!resp.next) {
      return parseInt(resp.next.match(/(?<=offset=)\d+/)[0], 10) / this.itemPerPage;
    }
    return Math.ceil(resp.count / this.itemPerPage);
  }

  fethTypes(): Observable<string[]> {
    return this.http.get<ApiList>(API + 'type')
      .pipe(
        map(resp => {
          return resp.results.map(type => type.name);
        }));
  }

  pokemonList(url = API + 'pokemon'): Observable<Results[]> {
    console.log(url);
    return this.http.get<ApiList>(url)
      .pipe(
        tap(resp => {
          resp.page = this.getPageNumber(resp);
          this.apiSubject.next(resp);
        }),
        map(resp => resp.results));
  }

  pokeListPaginated(url) {
    url = url.split('limit')[0] + `limit=${this.itemPerPage}`;
    return this.pokemonList(url);
  }

  fetchPokemonsPreview(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  fetchPokemon(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  fetchByTypes(types: string[]): Observable<Results[]> {

    this.apiSubject.next({ count: 1, next: null, previous: null });

    const output: Results[] = [];

    types.map(type => {
      return this.http.get<PokeType>(API + `type/${type.toLowerCase()}`)
        .pipe(
          map(resp => resp.pokemon.map(poke => poke.pokemon))
        );
    })
      .map(it => {
        it.subscribe(a => {
          a.map(b => output.push(b));
        });
      });

    return of(output);
  }

  fetchByNameOrNumber(identification): Observable<Results[]> {
    const result: Results[] = [];
    result.push({ name: identification, url: API + `pokemon/${identification?.toLowerCase()}` });
    this.apiSubject.next({ count: 1, next: null, previous: null });
    return of(result);
  }

}

