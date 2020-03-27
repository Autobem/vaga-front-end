import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListPokemonsModule } from './components/list-pokemons/list-pokemons.module';
import { HeaderComponent } from './components/header/header.component';
import { ListPokemonsService } from './components/list-pokemons/service/list-pokemons.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ListPokemonsModule,
    HttpClientModule
  ],
  providers: [ListPokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
