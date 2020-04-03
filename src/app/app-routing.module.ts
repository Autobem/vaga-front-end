import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PokedexGuard } from './guards/pokedex.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'pokedex/:id', component: PokedexComponent, canActivate:[PokedexGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
