import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PokeAPI, PokemonDetails } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService{
  pokeUrl: any;
  pokeSpecieUrl: any;

  constructor(private http: HttpClient) {
    this.pokeUrl = environment.pokeUrl;
    this.pokeSpecieUrl = environment.pokeSpecieUrl
   }

   //get original 151 pokemons
   getPokemon(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeUrl}?limit=151`)
      .pipe(catchError(this.handleError));
  } 

  // Use name to get pokemon details
  getPokemonDetails(name): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeUrl}/${name}`)
      .pipe(catchError(this.handleError));
  }

  // Use name to get specie details
  getPokemonSpecies(name): Observable<any> {
    return this.http
      .get<any>(`${this.pokeSpecieUrl}/${name}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
