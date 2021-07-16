import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  listName(name:String){
    return this.http.get(`${environment.baseURL}pokemon/${name}`)
  }

  listByPage( link:String = ""){
    if(link != ""){
      console.log("com link"+link);
      return this.http.get(`${link}`)
    }else{
      console.log("sem link"+link);
      return this.http.get(`${environment.baseURL}pokemon?offset=0&limit=10`)

    }

  }  

}
