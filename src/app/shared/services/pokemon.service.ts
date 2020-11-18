import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search.model';
import { ResponsePageable } from '../models/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiUrl = 'https://pokeapi.co/api/v2/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPokemonList(search: Search) : Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + 'pokemon/?limit=30&offset=' + (search?.page - 1)*30);
  }

  public getPokemonSearchName(search: Search) : Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + 'pokemon/'+search?.text+'?limit=30&offset=' + (search?.page - 1)*30);
  }

  public getPokemonSearchType(search: Search) : Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + 'type/'+search?.text+'?limit=30&offset=' + (search?.page - 1)*30);
  }
}
