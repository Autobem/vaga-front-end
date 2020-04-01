import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Arquivo de services para conexão com a API
export class PokemonService {

  constructor(private http: HttpClient) { 

  }

  getTodosPokemons(offset: number, limit: number): Observable<Object[]>{
    return this.http.get<Object[]>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(nome: string): Observable<Object>{
      return this.http.get<Object>(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  }

  getFlavorTextByName(nome: string): Observable<Object>{
    return this.http.get<Object>(`https://pokeapi.co/api/v2/pokemon-species/${nome}`);
  }

  getPokemonsByType(type: string): Observable<Object>{
    return this.http.get<Object>(`https://pokeapi.co/api/v2/type/${type}`);
  }

}
