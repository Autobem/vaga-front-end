import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListPokemonsModule } from './components/list-pokemons/list-pokemons.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ListPokemonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
