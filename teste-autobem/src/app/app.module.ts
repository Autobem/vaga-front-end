import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { MenuButtonFill } from 'ngx-bootstrap-icons';
import { NgxNavDrawerModule } from 'ngx-nav-drawer';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/main/pokemon-list/pokemon-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { TypeFilterPipe } from './pipes/typeFilter.pipe';
import { FormSearchComponent } from './shared/form-search/form-search.component';
import { PokemonDetailsComponent } from './components/main/pokemon-details/pokemon-details.component';

const icons = {
  MenuButtonFill
}
const components = [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  AboutComponent,
  PokemonListComponent,
  PokemonDetailsComponent,
  SearchPipe,
  TypeFilterPipe,
  FormSearchComponent
]
const modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  NgxBootstrapIconsModule.pick(icons),
  NgxNavDrawerModule,
  NgxPaginationModule,
  Ng2SearchPipeModule,
  ModalModule.forRoot(),
  BrowserAnimationsModule,
  BsDropdownModule.forRoot()
]
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],

  providers: [ BsModalRef ],
  bootstrap: [AppComponent],
  entryComponents: [
    PokemonDetailsComponent
  ]
})
export class AppModule { }
