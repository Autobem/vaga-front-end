import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListagemComponent } from './views/pokemon-listagem/pokemon-listagem.component';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokeDetailComponent } from './views/poke-detail/poke-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListagemComponent,
    PokeDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
