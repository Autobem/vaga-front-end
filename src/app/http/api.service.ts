import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(
    private http: HttpClient
  ) { }

  ApiConn(set: number = null, limit: number = null, pkId: string = null): Observable<any> {
    
    let url = this._url + "/?";
    
    if (limit != null) {
      url = url + `limit=${limit}`;
    }
    
    if (set != null) {
      if (url.includes("limit=")) {
        url = url + "&";
      }
      url = url + `offset=${set}`;
    }


    if (pkId != null) {
      url = this._url + "/" + pkId;
    }

    return this.http.get(url);
  }

}
