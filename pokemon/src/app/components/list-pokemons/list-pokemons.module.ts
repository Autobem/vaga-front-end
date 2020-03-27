import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonsComponent } from './list-pokemons.component';
import { ListPokemonsService } from './service/list-pokemons.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
 declarations: [ListPokemonsComponent],
 imports: [
 CommonModule,
 ReactiveFormsModule
 ],
 exports:[ListPokemonsComponent],
 providers: [ListPokemonsService]
})
export class ListPokemonsModule { }
