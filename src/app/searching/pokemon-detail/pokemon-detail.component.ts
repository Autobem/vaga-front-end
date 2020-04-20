import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { SearchingFectherService } from '../searching-fetcher.service';
import { fade } from '../../_animations/route.animation';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  animations: [
    fade
  ],
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() url: string;
  @Output() childEvent = new EventEmitter();

  pokemon$: Observable<Pokemon>;

  constructor(private service: SearchingFectherService) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.pokemon$ = this.service.fetchPokemonDetails(this.url);
  }

  fetchPokemonBySpecieUrl(url) {
    return this.service.fetchPokemonBySpecie(url);
  }

}
