import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})


export class PokedexGuard implements CanActivate {

  constructor(private navService: NavigationService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.navService.pokemonHasBeenSelected){
      return true
    }
    else{
      this.router.navigate( [''], {fragment: 'top'});
    };
  }
  
}
