import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrlRead: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrlRead = 'https://pokeapi.co/api/v2/pokemon';
  }

  getPokemonByName(pokemon: string): Observable<any>{
    pokemon = pokemon.toLocaleLowerCase();
    return this.http.get<any>(`${this.baseUrlRead}/${pokemon}/`);
  }

  getAllPokemons(url): Observable<any[]>{
    return this.http.get<any[]>(url);
  }
}
