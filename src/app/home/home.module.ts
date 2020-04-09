import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [HomeComponent, DetailsComponent, HeaderComponent, ModalComponent, BarChartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class HomeModule { }
