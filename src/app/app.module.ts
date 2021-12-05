import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaPokemonComponent } from './lista-pokemon/lista-pokemon.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListaPokemonComponent],
  imports: [BrowserModule, HttpClientModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
