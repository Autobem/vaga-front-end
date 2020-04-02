import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemons: any[] = [];
  sortText = 'Ordenar por Número';
  finishList = false;
  next: string = null;
  pokemonModal: any;

  constructor(
    private modalService: NgbModal,
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.open();
    this.pokemonModal = {url: '', name: '', description: ''};
    this.nextFind();
  }

  sortList(){
    if ( this.sortText === 'Ordenar por Número' ){
      this.sortById();
      this.sortText = 'Ordenar por Nome';
    } else if ( this.sortText === 'Ordenar por Nome' ){
      this.sortByName();
      this.sortText = 'Ordenar por Número';
    }
  }

  sortById(){
    if ( this.pokemons.length > 0 ){
      console.log('id ', this.pokemons = this.pokemons.sort( (pokemonA, pokemonB) => {
        if (pokemonA.id < pokemonB.id) { return -1; }
        if (pokemonA.id > pokemonB.id) { return 1; }
        return 0;
      }));
    }
  }

  sortByName(){
    if (this.pokemons.length > 0){
      console.log('nome ', this.pokemons = this.pokemons.sort( ( pokemonA, pokemonB ) => {
        if (pokemonA.name < pokemonB.name) { return -1; }
        if (pokemonA.name > pokemonB.name) { return 1; }
        return 0;
      }));
    }
  }

  getPokemons(url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=8'){
    this.service.getAllPokemons(url)
      .subscribe(
        (resp: any) => {
          if ( !resp.next ) {
            this.finishList = true;
          }
          this.next = resp.next;
          this.getDataPokemons(resp.results);
          // this.pokemons = this.pokemons.concat(resp.results);
        },
        error => {
          console.log(error);
        }
      );
  }

  getDataPokemons(pokemons: any[]){
    pokemons.forEach(el => {
      this.service.getPokemonByName(el.name)
        .subscribe(
          resp => {
           const pokemon: any = {};
           pokemon.id = resp.id;
           pokemon.name = resp.name;
           pokemon.height = resp.height / 10;
           pokemon.weight = resp.weight / 10;
           pokemon.url = resp.sprites.front_default;
           pokemon.description = 'Um testo apenas para teste';
           pokemon.abilities = resp.abilities;
           pokemon.types = resp.types;
           pokemon.stats = resp.stats;
           this.pokemons.push(pokemon);
          },
          error => {}
        );
    });
  }

  nextFind(){
    if (this.finishList) {
      console.log('Acabaram os Pokémons conhecidos! :/');
    }
    else if (!this.next){
      this.getPokemons();
    } else {
      this.getPokemons(this.next);
    }
  }

  openPokemon(pokemon: any){
    this.pokemonModal = pokemon;
  }

  open() {
    this.modalService.open(ModalComponent);
    // const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
