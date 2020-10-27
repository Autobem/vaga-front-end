import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ModalService } from './services/modal.service';

import { HomeViewComponent } from './view/home-view/home-view.component';
import { ModalComponent } from './cmp/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
