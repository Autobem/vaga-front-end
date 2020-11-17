import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/main/pokemon-list/pokemon-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { TypeFilterPipe } from './pipes/typeFilter.pipe';
import { FormSearchComponent } from './shared/form-search/form-search.component';
import { PokemonDetailsComponent } from './components/main/pokemon-details/pokemon-details.component';


const components = [
  AppComponent,
  HeaderComponent,
  PokemonListComponent,
  PokemonDetailsComponent,
  SearchPipe,
  TypeFilterPipe,
  FormSearchComponent
]
const modules = [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  NgxPaginationModule,
  ModalModule.forRoot(),
  BrowserAnimationsModule,
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
