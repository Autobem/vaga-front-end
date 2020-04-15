import { Component, OnInit, Input } from '@angular/core';
import { SearchingFectherService } from '../searching-fetcher.service';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit {

  @Input() url: string;
  @Input() name: string;

  preview: Observable<Pokemon>;

  constructor(private service: SearchingFectherService) { }

  ngOnInit(): void {
    this.preview = this.service.fetchPokemonsPreview(this.url);
  }

}
