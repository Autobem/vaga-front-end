import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './views/home/home.component';
import { ColapseButtonComponent } from './components/colapse-button/colapse-button.component';
import { InputBasicComponent } from './components/input-basic/input-basic.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './views/home/poke-list/poke-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColapseButtonComponent,
    InputBasicComponent,
    PokemonListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
