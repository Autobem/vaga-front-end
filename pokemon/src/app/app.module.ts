import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListPokemonsModule } from './components/list-pokemons/list-pokemons.module';
import { ListPokemonsService } from './components/list-pokemons/service/list-pokemons.service';
import {HttpClientModule} from '@angular/common/http';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListPokemonsModule,
    HttpClientModule,
    HeaderModule
  ],
  providers: [ListPokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
