import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  searchedTerms = new Subject<string>();

  constructor() { }

  searchService(term){
    this.searchedTerms.next(term)
  }
}
