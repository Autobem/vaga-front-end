import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss'],
})
export class ListaPokemonComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.dataService
      .getPokemons(9, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach((result) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }
}
