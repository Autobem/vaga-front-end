import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/home-page/navbar/navbar.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopComponent } from './pages/top/top.component';

declare var require: any;



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PesquisaComponent,
    SearchPipe,
    PokedexComponent,
    HomePageComponent,
    TopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFullpageModule,
    HttpClientModule,
    ReactiveFormsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
