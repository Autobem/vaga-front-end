import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Pokemon } from 'src/app/models/pokemon';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon: Pokemon = {}
  constructor(private navigationService: NavigationService,  private router: Router) { }

  ngOnInit(): void {
    this.pokemon = this.navigationService.getSelectedPokemon();
  }

  back() {
    this.router.navigate([''], { fragment: 'features' })
  }

}
