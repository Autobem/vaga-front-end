import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonsComponent } from './list-pokemons.component';

@NgModule({
 declarations: [ListPokemonsComponent],
 imports: [
 CommonModule,
 ],
 exports:[ListPokemonsComponent]
})
export class ListPokemonsModule { }
