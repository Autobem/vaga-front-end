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
import { forkJoin } from 'rxjs/internal/observable/forkJoin';


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
  typeSearch: boolean = false;
  sort: string = ''
  count: number = 0;
  nameSort: boolean = false;
  lastPageFetched: number = 0;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private searchPipe: SearchPipe,
    private router: Router,
    public navigationService: NavigationService,
  ) {

    if (this.navigationService.visitedPokedex) {
      this.reloadContent();
    }
    else this.getPages(this.currentPageNumber)

    this.loadSelect()

    this.pokemonForm = this.fb.group({
      pokemonInputControl: [this.navigationService.getCurrentContent().input],
      typeSelectControl: [this.navigationService.getCurrentContent().typeSelected]
    })

  }

  ngOnInit(): void {


  }


  getPages(page: number) {

    if (page == 0) {

      this.dataService.fetchPage(page).then((res) => {
        this.count = Math.trunc(res.count / this.pokemonsPerPage);
        this.getData(res.results)

        this.dataService.fetchPage(page + 1).then((res) => {
          this.getData(res.results)
        })

      })
    }

    else if (page > this.lastPageFetched) {

      this.dataService.fetchPage(page + 1).then((res) => {
        this.getData(res.results)
      })

    }

  }


  getData(pokemonRes) {

    if (this.currentPageNumber > this.lastPageFetched || this.currentPageNumber == 0) {

      this.lastPageFetched = this.currentPageNumber;

      const promises = [];

      if (this.typeSearch) {
        pokemonRes.forEach(item => {

          promises.push(this.dataService.fetchUrl(item.pokemon.url))
        });
      }
      else {
        pokemonRes.forEach(item => {
          promises.push(this.dataService.fetchUrl(item.url))
        });
      }

      Promise.all(promises).then(res => {

        this.buildObjects(res);

      })
    }

  }

  buildObjects(res) {

    let pokemonObjs: Array<Pokemon> = [];

    res.forEach(element => {

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

      let typesLen = element.types.length;
      pokemon.color = this.dataService.getTypeColor(element.types[typesLen - 1].type.name);

      this.dataService.fetchUrl(element.species.url)
        .then(data => {

          this.dataService.fetchUrl(data.evolution_chain.url)
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
              let evolutionsPromises = pokemon.evolutionChain.map(pokemon => this.dataService.getPokemonByNameOrId(pokemon));
              let source = forkJoin(evolutionsPromises);
              source.subscribe(src => pokemon.evolutions = src)
            })
        })
      pokemonObjs.push(pokemon);
      this.pokemonResults.push(pokemon);
    })

    const len = pokemonObjs.length;

    if (len > this.pokemonsPerPage) {
      const qty = len / this.pokemonsPerPage;

      for (let i = 0; i < qty; i++) {
        this.pages.push(pokemonObjs.slice(this.pokemonsPerPage * i, (this.pokemonsPerPage * i) + this.pokemonsPerPage))
      }
    }

    else {
      this.pages.push(pokemonObjs)
    }

    this.isLoaded = true;
  }

  onSearch() {

    const inputValue = this.pokemonForm.value.pokemonInputControl;

    let results = [];
    this.pokemonResults = []
    this.pages = []
    this.isLoaded = false;
    this.currentPageNumber = 0;
    this.typeSearch = false;

    if (inputValue == "") {
      this.getPages(this.currentPageNumber)
    }

    else {
      this.dataService.getPokemonByNameOrId(inputValue)
        .then((res) => {
          results.push(res)
          this.buildObjects(results)
        }).catch(() => {
          this.isLoaded = true;
        })
    }

  }

  onTypeSearch() {

    const selectValue = this.pokemonForm.value.typeSelectControl;

    this.currentPageNumber = 0;
    this.typeSearch = true;
    this.isLoaded = false;
    this.pokemonResults = []
    this.pages = []

    if (selectValue == 0) {
      this.typeSearch = false;
      this.getPages(this.currentPageNumber)
    }
    else {

      this.dataService.getPokemonByType(selectValue)
        .then((res) => {

          this.getData(res.pokemon)

        }).catch(() => {
          this.isLoaded = true;
        })
    }

  }

  loadSelect() {
    this.types = this.dataService.getTypes();
  }

  nextPage() {

    if (!this.isLastPage()) {
      this.currentPageNumber++;
      this.getPages(this.currentPageNumber);
    }

    if (this.nameSort) {
      this.onNameSort()
    }

  }

  previousPage() {
    if (this.currentPageNumber > 0) this.currentPageNumber--;
  }

  openPokemon(id: any) {

    this.navigationService.setCurrentContent(this.pages, this.pokemonResults,
      this.sort, this.currentPageNumber,
      this.typeSearch, this.pokemonForm.value.typeSelectControl, this.pokemonForm.value.pokemonInputControl, this.count)

    this.navigationService.pokemonHasBeenSelected = true;
    this.selectedPokemon = this.pokemonResults.find(x => x.id === id);
    this.navigationService.setSelectedPokemon(this.selectedPokemon);
    this.navigationService.visitedPokedex = true;
    this.router.navigate([`pokedex/${id}`])
  }

  onNameSort() {
    this.nameSort = true;
    this.sort = 'name';
    this.sortPokemonArray(this.pokemonResults, this.sort)
  }

  onIdSort() {
    this.nameSort = false;
    this.sort = 'id';
    this.sortPokemonArray(this.pokemonResults, this.sort)
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

  sliceInPages(pokemons: Array<Pokemon>) {

    this.pages = [];

    this.numPages = Math.trunc(pokemons.length / this.pokemonsPerPage) + 1;


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

  reloadContent() {
    this.pages = this.navigationService.getCurrentContent().pages;
    this.pokemonResults = this.navigationService.getCurrentContent().array;
    this.currentPageNumber = this.navigationService.getCurrentContent().currentPage;
    this.typeSearch = this.navigationService.getCurrentContent().typeSearch;
    this.count = this.navigationService.getCurrentContent().count;

    if (this.navigationService.getCurrentContent().sort == 'name') {
      this.onNameSort()
    }
    this.isLoaded = true;
  }

  isLastPage() {
    if (this.count == this.currentPageNumber || this.currentPageNumber + 1 == this.pages.length) {
      return true;
    }
    else return false;
  }

}
