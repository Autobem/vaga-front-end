import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/main/pokemon-list/pokemon-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { TypeFilterPipe } from './pipes/typeFilter.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PokemonModalComponent } from './components/main/pokemon-modal/pokemon-modal.component';


const components = [
  AppComponent,
  HeaderComponent,
  PokemonListComponent,
  PokemonModalComponent,
  SearchPipe,
  TypeFilterPipe,
  SearchBarComponent
]
const modules = [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  NgxPaginationModule,
  ModalModule.forRoot()
]
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],

  // providers: [ BsModalRef ],
  bootstrap: [AppComponent],
  entryComponents: [
    // PokemonDetailsComponent
  ]
})
export class AppModule { }
