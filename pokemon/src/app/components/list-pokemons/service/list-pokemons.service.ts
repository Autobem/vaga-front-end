import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListPokemonsService {

  constructor(private http: HttpClient) {
    
  }

  listByName(name?) {
    if (name) { return this.http.get(`${environment.api}/pokemon/${name}/`); }
  }

  listTypes() {
    return this.http.get(`${environment.api}/type/`);
  }

  listByTypes(type) {
    if(type) return this.http.get(`${environment.api}/type/${type}`);
  }

  findByUrl(url) {
    if(url) return this.http.get(url);
  }

  listAll( pagination? ) {
    if(pagination) return this.http.get(`${pagination}`);
    return this.http.get(`${environment.api}/pokemon/`);
  }

}
