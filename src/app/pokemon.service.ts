import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
// import { ResponsePageable } from './shared/model/responsePageble.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 
  constructor(private http: HttpClient) { }

  public listarPokemons(limit: number, offset: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset${offset}`);
  }

  public informarPokemon(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  public buscarTipos() {
    return this.http.get(`https://pokeapi.co/api/v2/type?offset=9&limit=5`);
  }

  public listFire(type: string) {
    return this.http.get(`https://pokeapi.co/api/v2/type/${type}`);
  }
}
