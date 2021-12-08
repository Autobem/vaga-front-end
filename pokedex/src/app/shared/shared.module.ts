import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ListPokemonsComponent
  ],
  exports:[
    HeaderComponent,
    SearchComponent,
    ListPokemonsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
