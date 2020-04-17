import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { SearchingFectherService } from '../searching-fetcher.service';
import { PokeSpecie } from 'src/app/shared/models/pokespecie';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() url: string;

  pokemon$: Observable<Pokemon>;

  constructor(private service: SearchingFectherService) { }

  ngOnInit(): void {
    this.pokemon$ = this.service.fetchPokemonDetails(this.url);
  }

  fetchPokemonBySpecieUrl(url) {
    return this.service.fetchPokemonBySpecie(url);
  }

}
