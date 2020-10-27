import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isOpen: boolean = false;
  public pokemon: Array<any> = null;

  constructor(
    private http: ApiService,
  ) {
  }
    
  OpenModal(_pk) {
    this.pokemon = [];
    this.http.ApiConn(null,null,_pk.id).toPromise().then(
      res => {
        this.isOpen = true;
        this.pokemon.push(res);
      }
    );
  }

  CloseModal() {
    this.isOpen = false;
  }
}
