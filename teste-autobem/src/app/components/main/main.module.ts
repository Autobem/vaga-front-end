import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';


import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ListDetailsRoutingModule } from './list-details-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    ListDetailsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class MainModule { }
