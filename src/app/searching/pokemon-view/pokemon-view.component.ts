import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SearchingFectherService } from '../searching-fetcher.service';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { Observable, Subscription } from 'rxjs';
import { Results } from 'src/app/shared/models/api-list';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit, OnDestroy {

  modal = false;

  @Input() result: Results;
  @Input() result$: Observable<Results>;
  @Output() pokeClick = new EventEmitter();

  preview$: Observable<Pokemon>;

  sub: Subscription;

  constructor(private service: SearchingFectherService) { }

  ngOnInit(): void {
    if (this.result !== undefined) {
      this.preview$ = this.service.fetchPokemonsPreview(this.result.url);
    } else {
      this.sub = this.result$.subscribe(result => {
        this.preview$ = this.service.fetchPokemonsPreview(result.url);
      });
    }
  }

  onClick() {
    this.pokeClick.emit(this.result.url);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
