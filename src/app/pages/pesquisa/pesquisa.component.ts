import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Pokemon } from 'src/app/models/pokemon';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { Move } from 'src/app/models/move';
import { Stat } from 'src/app/models/stat';
import { PokemonType } from 'src/app/models/pokemon-type';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
  providers: [SearchPipe]
})
export class PesquisaComponent implements OnInit {


  pokemons: Array<Pokemon> = [];
  pokemonsPerPage: number = 18;
  numPages: number = 1;
  pages: Array<Array<Pokemon>> = [];
  currentPageNumber: number = 0;
  pokemonResults: Array<Pokemon> = [];
  isLoaded: boolean = false;
  pokemonForm: FormGroup;
  pokemonInputControl: FormControl;
  typeSelectControl: FormControl;
  selectedPokemon: Pokemon = {}
  types: Array<PokemonType> = []

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private searchPipe: SearchPipe,
    private router: Router,
    public navigationService: NavigationService,
  ) {
    this.pokemonForm = this.fb.group({
      pokemonInputControl: [''],
      typeSelectControl: ['']
    })
  }

  ngOnInit(): void {
    this.getThemAll();
    this.loadSelect()
  }

  getThemAll() {

    const promises = [];

    for (let i = 1; i < 807; i++) {

      const url = `https://pokeapi.co/api/v2/pokemon/${i}`

      promises.push(fetch(url)
        .then((res) => res.json()));
    }

    Promise.all(promises).then(results => {

      this.isLoaded = true;

      results.forEach(element => {

        let pokemon: Pokemon = {}

        pokemon = {
          id: element.id,
          name: element.name,
          types: element.types,
          sprite: element.sprites.front_default,
          height: element.height / 10,
          weight: element.weight / 10,
          abilities: element.abilities.map((ability) => ability.ability.name),
          moves: [],
          stats: [],
          evolutionChain: []
        }

        element.moves.forEach(item => {
          let len: number = item.version_group_details.length;
          let move: Move = { name: '', method: '' };
          move.method = item.version_group_details[len - 1].move_learn_method.name;
          move.name = item.move.name;
          pokemon.moves.push(move)
        });

        element.stats.forEach(item => {
          let _stat: Stat = { name: '', value: 0 }
          _stat.name = item.stat.name;
          _stat.value = item.base_stat;
          pokemon.stats.push(_stat);
        });

        let typesLen = element.types.length
        pokemon.color = this.dataService.getTypeColor(element.types[typesLen - 1].type.name);

        fetch(element.species.url)
          .then((res) => res.json())
          .then(data => {

            fetch(data.evolution_chain.url).then((result) => result.json())
              .then(src => {

                let len1: number = 0; //qtd evoluções da primeira evolução
                let len2: number = 0; //qtd evoluções da segunda evolução

                len1 = src.chain.evolves_to.length;

                pokemon.evolutionChain.push(src.chain.species.name)

                if (len1 > 0) {
                  len2 = src.chain.evolves_to[0].evolves_to.length;
                  pokemon.evolutionChain.push(src.chain.evolves_to[0].species.name)
                }

                if (len2 > 0) {
                  pokemon.evolutionChain.push(src.chain.evolves_to[0].evolves_to[0].species.name)
                }
              })
          });
        this.pokemons.push(pokemon);
      });

      this.pokemonResults = this.pokemons;
      this.sliceInPages(this.pokemons);

    });

  }

  sliceInPages(pokemons: Array<Pokemon>) {
    this.pages = [];
    this.numPages = Math.trunc(pokemons.length / this.pokemonsPerPage);

    if (this.numPages > 0) {
      for (let i = 0; i < this.numPages; i++) {

        let page: Array<Pokemon> = [];
        page = pokemons.slice(i * this.pokemonsPerPage, (i * this.pokemonsPerPage) + this.pokemonsPerPage)
        this.pages.push(page)

      }
    }
    else {
      this.pages.push(pokemons)
    }

  }

  sortPokemonArray(pokemons: Array<Pokemon>, value: string) {

    if (value == "id") {
      pokemons.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        else {
          return -1;
        }
      });

    } else {
      pokemons.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }

    this.sliceInPages(pokemons);


  }

  onSelect() {
    this.search(this.pokemonForm.value.pokemonInputControl);
  }

  onKeyUp(e) {
    this.search(this.pokemonForm.value.pokemonInputControl);
  }

  search(text: string) {
    this.currentPageNumber = 0;
    this.pokemonResults = []

    this.pokemonResults = this.searchPipe.transform(this.pokemons, text, this.pokemonForm.value.typeSelectControl);

    this.sliceInPages(this.pokemonResults);
  }

  loadSelect() {
    this.types = this.dataService.getTypes();
  }

  nextPage() {
    this.currentPageNumber++;
  }

  previousPage() {
    this.currentPageNumber--;
  }

  openPokemon(id: any) {

    this.navigationService.pokemonHasBeenSelected = true;
    this.navigationService.setSelectedPokemon(this.pokemons.find(x => x.id === id));
    this.selectedPokemon = this.pokemons.find(x => x.id === id);
    this.router.navigate([`pokedex/${id}`])
    this.navigationService.visitedPokedex = true;
  }

}
