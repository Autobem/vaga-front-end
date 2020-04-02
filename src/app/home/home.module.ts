import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [HomeComponent, DetailsComponent, HeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class HomeModule { }
