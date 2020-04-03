import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Pokemon } from 'src/app/models/pokemon';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router, ActivatedRoute} from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon: Pokemon = {}
  evolutions: Array<Pokemon> = []

  constructor(private navigationService: NavigationService, private dataService: DataService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

      this.pokemon = this.navigationService.getSelectedPokemon();
      this.setPokemon();

  }
  setPokemon(){
    
    let observables = this.pokemon.evolutionChain.map(pokemon => this.dataService.getPokemonByName(pokemon));

    let source = forkJoin(observables);

    source.subscribe(src => {this.evolutions = src; console.log(this.evolutions);})

  }

  back(){
    this.router.navigate([''], {fragment: 'features'} )
  }

}
