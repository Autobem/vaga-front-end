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

  ApiConn(pk: string = null): Observable<any> {
    
    let url = this._url;
    
    if (pk == null) {
      url = url + "/?offset=5&limit=5";
    } else {
      url = url + `/${pk}`; 
    }

    return this.http.get(url);
  }

  GetPK(pk: any = null) {
    let pkm = this.ApiConn(pk).subscribe(
      res => {
        return res;
      },
      err => {
        return pkm;
      }
    );
  }


}
