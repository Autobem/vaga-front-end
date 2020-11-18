import { Component, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/shared/services/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private pokeService: PokemonService
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  search = {
    type: {
      endpoint: 'pokemon',
      title: 'nome'
    },
    text: '',
    page: 1,
    offset: 30,
    total_pages: 0
  };

  pokeList = [];

  onChangeTypeSearch = (type) => {
    this.search.type.endpoint = type.endpoint;
    this.search.type.title = type.title;
  }

  onChangeTextSearch = (text) => {
    if (text === '') {
      this.onLoad();
    }
    this.search.text = text;
  }

  onChangeList = data => {
    this.pokeList = data;
  }

  onPageChange = value => {
    this.search.page = value;
    this.onLoad();
    window.scrollTo( 0, 0 );
  }

  onChangeTotal = value => {
    let newValue = value / this.search.offset;
    if ((value % this.search.offset) === 0) {
      this.search.total_pages = newValue;
    }
    else {
      this.search.total_pages = newValue + 1;
    }

  }

  onLoad() {
    this.pokeService.getPokemonList(this.search).subscribe(data => {
      // this.livesPrevious = data;
      this.onChangeList(data.results);
      this.onChangeTotal(data.count);
      console.log(data);
    });
  }

  onSearch() {
    if (this.search.text != '') {
      if (this.search.type.endpoint === 'pokemon') {
        this.pokeService.getPokemonSearchName(this.search).subscribe(data => {
          this.onChangeList([{ ...data, url: '_/_/_/' + data?.id + '/' }]);
          console.log(data);
        }, err => this.onChangeList([]));
      }
      else {
        this.pokeService.getPokemonSearchType(this.search).subscribe(data => {
          let pokemons = [];
          data?.pokemon?.forEach(element => {
            pokemons.push(element?.pokemon);
          });
          this.onChangeList(pokemons);
        }, err => this.onChangeList([]));
      }
    }
  }
}
