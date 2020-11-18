import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokemonListComponent {

  //livesPrevious: Live[];
  //livesNext: Live[];

  constructor(
  ) { }

  @Input() list: any[];

}
