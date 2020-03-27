import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListPokemonsService {

  constructor(private http: HttpClient) {
    
  }

  listByName(name?, pagination?) {
    if (name) { return this.http.get(`${environment.api}/pokemon/${name}/${pagination}`); }
    return this.http.get(`${environment.api}/pokemon`);
  }

  listByCategory(id?,  pagination?) {
    if (id) { return this.http.get(`${environment.api}/pokemon/${id}/${pagination}`); }
    return this.http.get(`${environment.api}/pokemon/${pagination}`);
  }

  findByUrl(url) {
    return this.http.get(url);
  }

  listAll( pagination? ) {

    console.log(pagination)
    if(pagination) return this.http.get(`${pagination}`);
    return this.http.get(`${environment.api}/pokemon/`);
  }

}
