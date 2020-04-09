import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { Pokemon } from 'src/app/model/pokemon.model';
import { PokemonResult } from 'src/app/model/pokemon-result.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
       {
           display: true,
           position: 'left',
           ticks: {
             fontSize: 15,
             fontColor: '#333',
             fontFamily: 'Arial'
           }
       }
     ]
   }
  };
  barChartOptionsMobile = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
       {
           display: false
       },
      ],
       xAxes: [{
        display: true,
        position: 'left',
        ticks: {
          fontSize: 14,
          fontColor: '#333'
        }
       }
       ]
   }
  };
  barChartLabels: string[] = ['1', '2', '3', '4', '5', '6'];
  barChartType = 'horizontalBar';
  barChartTypeMobile = 'bar';
  barChartLegend = false;
  barChartData: any[] = [
    {data: [1, 2, 3, 4, 5, 6 ]}
  ];

  listLabel: string[] = [];
  listData: number[] = [];

  pokemons: Pokemon[] = [];
  finishList = false;
  next: string = null;
  pokemonModal: Pokemon;

  constructor(
    private modalService: NgbModal,
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.open();
    this.pokemonModal = new Pokemon();
    console.log('modal ', this.pokemonModal);
    this.nextFind();
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

  getPokemons(url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12'){
    this.service.getAllPokemons(url)
      .subscribe(
        (resp: Pageable) => {
          const page = resp;
          if ( !page.next ) {
            this.finishList = true;
          }
          this.next = page.next;
          this.getDataPokemons(page.results);
          // this.pokemons = this.pokemons.concat(resp.results);
        },
        error => {
          console.log(error);
        }
      );
  }

  getDataPokemons(pokemons: PokemonResult[]){
    pokemons.forEach(el => {
      this.service.getPokemonByName(el.name)
        .subscribe(
          (resp: Pokemon) => {
           const pokemon = resp;
           pokemon.height /= 10;
           pokemon.weight /= 10;
           /*pokemon.id = resp.id;
           pokemon.name = <string> resp.name;
           pokemon.height = resp.height / 10;
           pokemon.weight = resp.weight / 10;
           pokemon.url = resp.sprites.front_default;
           pokemon.abilities = resp.abilities;
           pokemon.types = resp.types;
           pokemon.stats = resp.stats;*/
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

  openPokemon(pokemon: Pokemon){
    this.listLabel = [];
    this.listData = [];
    pokemon.stats.forEach(p => {
      this.listLabel.push(p.stat.name);
      this.listData.push(p.base_stat);
    });
    this.barChartLabels = this.listLabel;
    this.barChartData = [
        {data: this.listData}
    ];
    this.pokemonModal = pokemon;
  }

  open() {
    this.modalService.open(ModalComponent);
    // const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
