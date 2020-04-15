import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon';
import { ApiList, Results } from '../shared/models/api-list';


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

  pokemonList(): Observable<Results[]> {
    return this.http.get<ApiList>(API + 'pokemon')
      .pipe(
        tap(resp => {
          resp.page = this.getPageNumber(resp);
          this.apiSubject.next(resp);
        }),
        map(resp => resp.results));
  }

  pokeFecth(url): Observable<Results[]> {
    return this.http.get<ApiList>(url)
      .pipe(
        tap(resp => {
          resp.page = this.getPageNumber(resp);
          this.apiSubject.next(resp);
        }),
        map(resp => resp.results));
  }

  fetchPokemonsPreview(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  fetchPokemon(url): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

}

