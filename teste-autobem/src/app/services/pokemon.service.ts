import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
