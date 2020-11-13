import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ListDetailsRoutingModule } from './list-details-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    ListDetailsRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
