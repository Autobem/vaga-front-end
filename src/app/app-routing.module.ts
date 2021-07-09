import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListagemComponent } from './views/pokemon-listagem/pokemon-listagem.component';
import { PokeDetailComponent } from './views/poke-detail/poke-detail.component';

const routes: Routes = [
  {
    path:'',
    component: PokemonListagemComponent
  },
  {
    path:'poke-detail:id', 
    component: PokeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
